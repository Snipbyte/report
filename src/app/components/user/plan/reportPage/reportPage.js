"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { FaDownload, FaLock } from "react-icons/fa";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ReportPage = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      const planId = localStorage.getItem("planId");
      const token = localStorage.getItem("token");

      if (!planId) {
        setError("No Plan ID found.");
        setLoading(false);
        return;
      }
      if (!token) {
        setError("Unauthorized. Please log in first.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("/api/generatereport/result", {
          planId,
          token,
        });
        setReportData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch report data.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;

    // Cover Page
    doc.setFillColor(31, 41, 55); // Dark gray background
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text(reportData?.projectName || "Business Report", margin, 50);
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, 70);
    doc.setFontSize(12);
    doc.text("Prepared by: Your Company Name", margin, pageHeight - 20);
    doc.addPage();

    // Financial Table
    if (reportData?.financialResults?.yearlyPlan?.length > 0) {
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text("Yearly Financial Plan", margin, 20);
      doc.autoTable({
        startY: 30,
        head: [
          [
            "Year",
            "Revenue (€)",
            "Expenses (€)",
            "Product Costs (€)",
            "Gross Margin (€)",
            "Value Added (€)",
            "EBITDA (€)",
            "Cash Flow (€)",
            "Staff Costs (€)",
            "Intermediate Consumption (€)",
          ],
        ],
        body: reportData.financialResults.yearlyPlan.map((year) => [
          year.year,
          year.revenue.toFixed(2),
          year.expenses.toFixed(2),
          year.productCosts.toFixed(2),
          year.grossMargin.toFixed(2),
          year.valueAdded.toFixed(2),
          year.EBITDA.toFixed(2),
          year.cashFlow.toFixed(2),
          year.staffCosts.toFixed(2),
          year.intermediateConsumption.toFixed(2),
        ]),
        theme: "striped",
        headStyles: { fillColor: [31, 41, 55], textColor: [255, 255, 255] },
        styles: { fontSize: 10, cellPadding: 3 },
        margin: { left: margin, right: margin },
      });
    }

    // Financial Summary
    if (reportData?.financialResults) {
      doc.addPage();
      doc.setFontSize(16);
      doc.text("Financial Summary", margin, 20);
      doc.autoTable({
        startY: 30,
        head: [["Metric", "Value"]],
        body: [
          ["Total Revenue (€)", reportData.financialResults.totalRevenue?.toFixed(2) || "N/A"],
          ["Total Product Costs (€)", reportData.financialResults.totalProductCosts?.toFixed(2) || "N/A"],
          ["Gross Margin (€)", reportData.financialResults.grossMargin?.toFixed(2) || "N/A"],
          ["Gross Margin (%)", reportData.financialResults.grossMarginPercentage?.toFixed(2) || "N/A"],
          ["Total Charges (€)", reportData.financialResults.totalCharges?.toFixed(2) || "N/A"],
          ["Value Added (€)", reportData.financialResults.valueAdded?.toFixed(2) || "N/A"],
          ["Value Added (%)", reportData.financialResults.valueAddedPercentage?.toFixed(2) || "N/A"],
          ["Total Salaries (€)", reportData.financialResults.totalSalaries?.toFixed(2) || "N/A"],
          ["EBITDA (€)", reportData.financialResults.EBITDA?.toFixed(2) || "N/A"],
          ["Profitability", reportData.financialResults.profitability?.isProfitable ? "Profitable" : "Not Profitable"],
          ["EBITDA Margin (%)", reportData.financialResults.profitability?.EBITDAMargin?.toFixed(2) || "N/A"],
          ["Debt Coverage Ratio", reportData.financialResults.profitability?.debtCoverageRatio?.toFixed(2) || "N/A"],
          ["Market Potential Index", reportData.financialResults.scoring?.marketPotentialIndex || "N/A"],
          ["Recommendation", reportData.financialResults.scoring?.recommendation || "N/A"],
        ],
        theme: "striped",
        headStyles: { fillColor: [31, 41, 55], textColor: [255, 255, 255] },
        styles: { fontSize: 10, cellPadding: 3 },
        margin: { left: margin, right: margin },
      });
    }

    // Capture Charts
    const charts = document.querySelectorAll(".chart-container");
    let chartY = doc.autoTable.previous.finalY + 20 || 30;
    for (let chart of charts) {
      const canvas = await html2canvas(chart, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      if (chartY + imgHeight > pageHeight - 20) {
        doc.addPage();
        chartY = 20;
      }
      doc.setFontSize(14);
      doc.text(chart.dataset.title, margin, chartY);
      doc.addImage(imgData, "PNG", margin, chartY + 10, imgWidth, imgHeight);
      chartY += imgHeight + 30;
    }

    // Other Sections
    const sections = [
      {
        title: "General Information",
        data: [
          ["Project Name", reportData?.projectName || "N/A"],
          ["Type of Activity", reportData?.typeOfActivity || "N/A"],
          ["Address", reportData?.address || "N/A"],
          ["Launch Date", reportData?.launchDate ? new Date(reportData.launchDate).toLocaleDateString() : "N/A"],
        ],
      },
      {
        title: "Presentation",
        data: reportData?.presentation
          ? Object.entries(reportData.presentation).map(([key, value]) => [`Content (${key})`, value.replace(/<[^>]+>/g, "")])
          : [],
      },
      {
        title: "Visiting Card",
        data: reportData?.visitingCard
          ? Object.values(reportData.visitingCard).map((card) => [
              ["ID", card._id || "N/A"],
              ["Name", `${card.firstName} ${card.lastName}`],
              ["Title", card.title || "N/A"],
              ["Contact", card.contact || "N/A"],
              ["Email", card.email || "N/A"],
              ["Country", `${card.selectedCountry?.flag || ""} ${card.selectedCountry?.name || "N/A"} (${card.selectedCountry?.code || "N/A"})`],
            ]).flat()
          : [],
      },
      {
        title: "Carrier Information",
        data: reportData?.carrier
          ? Object.values(reportData.carrier).map((c) => [
              ["ID", c._id || "N/A"],
              ["Business Leader", c.businessLeader || "N/A"],
              ["Industry Experience", c.industryExperience || "N/A"],
              ["Family Situation", c.familySituation || "N/A"],
              ["Details", c.editorContent?.replace(/<[^>]+>/g, "") || "N/A"],
            ]).flat()
          : [],
      },
      {
        title: "Services",
        data: reportData?.services
          ? Object.values(reportData.services).map((s) => [
              ["ID", s._id || "N/A"],
              ["Name", s.name || "N/A"],
              ["Description", s.description?.replace(/<[^>]+>/g, "") || "N/A"],
            ]).flat()
          : [],
      },
      {
        title: "Market Analysis",
        data: reportData?.market
          ? Object.values(reportData.market).map((m) => [
              ["ID", m._id || "N/A"],
              ["Description", m.marketDescription?.replace(/<[^>]+>/g, "") || "N/A"],
              ...Object.entries(m.responses || {}).map(([k, v]) => [k.replace("row", "Question "), v || "N/A"]),
            ]).flat()
          : [],
      },
      {
        title: "Competitors",
        data: reportData?.competitors
          ? Object.values(reportData.competitors).flat().map((c) => [
              ["ID", c._id || "N/A"],
              ["Name", c.name || "N/A"],
              ["Price Status", c.priceStatus || "N/A"],
            ]).flat()
          : [],
      },
      {
        title: "Customers",
        data: reportData?.customers
          ? Object.values(reportData.customers).map((c) => [
              ["ID", c._id || "N/A"],
              ["Name", c.name || "N/A"],
              ["Type", c.type || "N/A"],
              ["Description", c.description?.replace(/<[^>]+>/g, "") || "N/A"],
            ]).flat()
          : [],
      },
      {
        title: "Sales Pitches",
        data: reportData?.salesPitches
          ? Object.entries(reportData.salesPitches).map(([key, value]) => [`Content (${key})`, value.replace(/<[^>]+>/g, "")])
          : [],
      },
      {
        title: "Customer Acquisition Actions",
        data: reportData?.customerAcquisitionActions
          ? Object.values(reportData.customerAcquisitionActions).flat().map((a) => [
              ["ID", a._id || "N/A"],
              ["Action ID", a.id || "N/A"],
              ["Name", a.name || "N/A"],
              ["Description", a.description?.replace(/<[^>]+>/g, "") || "N/A"],
            ]).flat()
          : [],
      },
    ];

    for (let section of sections) {
      if (section.data.length > 0) {
        if (doc.autoTable.previous.finalY > pageHeight - 50) {
          doc.addPage();
          chartY = 20;
        } else {
          chartY = doc.autoTable.previous.finalY + 20 || 20;
        }
        doc.setFontSize(16);
        doc.text(section.title, margin, chartY);
        doc.autoTable({
          startY: chartY + 10,
          head: [["Field", "Value"]],
          body: section.data,
          theme: "striped",
          headStyles: { fillColor: [31, 41, 55], textColor: [255, 255, 255] },
          styles: { fontSize: 10, cellPadding: 3 },
          margin: { left: margin, right: margin },
        });
      }
    }

    doc.save(`${reportData?.projectName || "report"}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  const renderSection = (title, content, bgColor = "bg-white") => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
        {title}
      </h2>
      <div className={`${bgColor} shadow-lg p-6 rounded-xl`}>{content}</div>
    </div>
  );

  const financialResults = reportData?.financialResults || {};
  const yearlyPlan = financialResults.yearlyPlan || [];

  const chartData = {
    series: [
      { name: "Revenue", data: yearlyPlan.map((year) => year.revenue) },
      { name: "Expenses", data: yearlyPlan.map((year) => year.expenses) },
      { name: "EBITDA", data: yearlyPlan.map((year) => year.EBITDA) },
      { name: "Value Added", data: yearlyPlan.map((year) => year.valueAdded) },
    ],
    options: {
      chart: { type: "bar", height: 400, toolbar: { show: true } },
      plotOptions: { bar: { horizontal: false, columnWidth: "55%" } },
      colors: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"],
      dataLabels: { enabled: false },
      xaxis: { categories: yearlyPlan.map((year) => year.year), title: { text: "Year" } },
      yaxis: { title: { text: "Amount (€)" } },
      tooltip: { y: { formatter: (val) => `€${val.toFixed(2)}` } },
      legend: { position: "top" },
    },
  };

  const lineChartData = {
    series: [
      { name: "Gross Margin", data: yearlyPlan.map((year) => year.grossMargin) },
      { name: "Cash Flow", data: yearlyPlan.map((year) => year.cashFlow) },
      { name: "Staff Costs", data: yearlyPlan.map((year) => year.staffCosts) },
      { name: "Intermediate Consumption", data: yearlyPlan.map((year) => year.intermediateConsumption) },
    ],
    options: {
      chart: { type: "line", height: 400, zoom: { enabled: false } },
      colors: ["#8b5cf6", "#f97316", "#ec4899", "#6b7280"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      xaxis: { categories: yearlyPlan.map((year) => year.year), title: { text: "Year" } },
      yaxis: { title: { text: "Amount (€)" } },
      tooltip: { y: { formatter: (val) => `€${val.toFixed(2)}` } },
      legend: { position: "top" },
    },
  };

  const isLimitedPlan = yearlyPlan.length === 2;

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {reportData?.projectName} Report
          </h1>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            <FaDownload className="mr-2" /> Download PDF
          </button>
        </div>
        <div className="report-container">
          {/* General Information */}
          {renderSection(
            "General Information",
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <strong className="text-lg text-gray-700">Project Name:</strong>
                <p className="text-gray-600">{reportData?.projectName || "N/A"}</p>
              </div>
              <div>
                <strong className="text-lg text-gray-700">Type of Activity:</strong>
                <p className="text-gray-600">{reportData?.typeOfActivity || "N/A"}</p>
              </div>
              <div>
                <strong className="text-lg text-gray-700">Address:</strong>
                <p className="text-gray-600">{reportData?.address || "N/A"}</p>
              </div>
              <div>
                <strong className="text-lg text-gray-700">Launch Date:</strong>
                <p className="text-gray-600">
                  {reportData?.launchDate ? new Date(reportData.launchDate).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          )}

          {/* Presentation */}
          {reportData?.presentation &&
            renderSection(
              "Presentation",
              Object.entries(reportData.presentation).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <strong className="text-lg text-gray-700">Content ({key}):</strong>
                  <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: value }} />
                </div>
              ))
            )}

          {/* Visiting Card */}
          {reportData?.visitingCard &&
            renderSection(
              "Visiting Card",
              Object.values(reportData.visitingCard).map((card) => (
                <div key={card._id} className="border-l-4 border-blue-600 pl-4 mb-4">
                  <p><strong>ID:</strong> {card._id || "N/A"}</p>
                  <p><strong>Name:</strong> {`${card.firstName} ${card.lastName}`}</p>
                  <p><strong>Title:</strong> {card.title || "N/A"}</p>
                  <p><strong>Contact:</strong> {card.contact || "N/A"}</p>
                  <p><strong>Email:</strong> {card.email || "N/A"}</p>
                  <p><strong>Country:</strong> {`${card.selectedCountry?.flag || ""} ${card.selectedCountry?.name || "N/A"} (${card.selectedCountry?.code || "N/A"})`}</p>
                </div>
              ))
            )}

          {/* Carrier Information */}
          {reportData?.carrier &&
            renderSection(
              "Carrier Information",
              Object.values(reportData.carrier).map((data) => (
                <div key={data._id} className="mb-4">
                  <p><strong>ID:</strong> {data._id || "N/A"}</p>
                  <p><strong>Business Leader:</strong> {data.businessLeader === "yes" ? "Yes" : "No"}</p>
                  <p><strong>Industry Experience:</strong> {data.industryExperience === "yes" ? "Yes" : "No"}</p>
                  <p><strong>Family Situation:</strong> {data.familySituation === "yes" ? "Yes" : "No"}</p>
                  <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: data.editorContent || "<p>N/A</p>" }} />
                </div>
              ))
            )}

          {/* Services */}
          {reportData?.services &&
            renderSection(
              "Services",
              Object.values(reportData.services).map((service) => (
                <div key={service._id} className="mb-4">
                  <p><strong>ID:</strong> {service._id || "N/A"}</p>
                  <p className="text-lg font-semibold">{service.name || "N/A"}</p>
                  <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: service.description || "<p>N/A</p>" }} />
                </div>
              ))
            )}

          {/* Market Analysis */}
          {reportData?.market &&
            renderSection(
              "Market Analysis",
              Object.values(reportData.market).map((market) => (
                <div key={market._id}>
                  <p><strong>ID:</strong> {market._id || "N/A"}</p>
                  <div className="mb-4">
                    <strong className="text-lg">Market Description:</strong>
                    <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: market.marketDescription || "<p>N/A</p>" }} />
                  </div>
                  <div>
                    <strong className="text-lg">Market Responses:</strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {Object.entries(market.responses || {}).map(([key, value]) => (
                        <div
                          key={key}
                          className={`p-4 rounded-lg shadow ${
                            value === "Positive" ? "bg-green-100" : value === "Negative" ? "bg-red-100" : "bg-gray-100"
                          }`}
                        >
                          <strong>{key.replace("row", "Question ")}:</strong> {value || "N/A"}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}

          {/* Competitors */}
          {reportData?.competitors &&
            renderSection(
              "Competitors",
              Object.values(reportData.competitors).flat().map((competitor) => (
                <div key={competitor._id} className="flex items-center mb-4">
                  <div className="flex-1">
                    <p><strong>ID:</strong> {competitor._id || "N/A"}</p>
                    <p><strong>Name:</strong> {competitor.name || "N/A"}</p>
                    <p><strong>Price Status:</strong> {competitor.priceStatus || "N/A"}</p>
                  </div>
                </div>
              ))
            )}

          {/* Customers */}
          {reportData?.customers &&
            renderSection(
              "Customers",
              Object.values(reportData.customers).map((customer) => (
                <div key={customer._id} className="mb-4">
                  <p><strong>ID:</strong> {customer._id || "N/A"}</p>
                  <p className="text-lg font-semibold">{customer.name || "N/A"}</p>
                  <p><strong>Type:</strong> {customer.type || "N/A"}</p>
                  <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: customer.description || "<p>N/A</p>" }} />
                </div>
              ))
            )}

          {/* Sales Pitches */}
          {reportData?.salesPitches &&
            renderSection(
              "Sales Pitches",
              Object.entries(reportData.salesPitches).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <strong className="text-lg">Content ({key}):</strong>
                  <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: value || "<p>N/A</p>" }} />
                </div>
              ))
            )}

          {/* Customer Acquisition Actions */}
          {reportData?.customerAcquisitionActions &&
            renderSection(
              "Customer Acquisition Actions",
              Object.values(reportData.customerAcquisitionActions).flat().map((action) => (
                <div key={action._id} className="mb-4">
                  <p><strong>ID:</strong> {action._id || "N/A"}</p>
                  <p><strong>Action ID:</strong> {action.id || "N/A"}</p>
                  <p className="text-lg font-semibold">{action.name || "N/A"}</p>
                  <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: action.description || "<p>N/A</p>" }} />
                </div>
              ))
            )}

          {/* Financial Results */}
          {financialResults && (
            renderSection(
              "Financial Results",
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <div>
                    <strong className="text-lg">Total Revenue:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.totalRevenue?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Total Product Costs:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.totalProductCosts?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Gross Margin:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.grossMargin?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Gross Margin (%):</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      {financialResults.grossMarginPercentage?.toFixed(2) || "N/A"}%
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Total Charges:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.totalCharges?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Value Added:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.valueAdded?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Value Added (%):</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      {financialResults.valueAddedPercentage?.toFixed(2) || "N/A"}%
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Total Salaries:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.totalSalaries?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">EBITDA:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.EBITDA?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Profitability:</strong>
                    <p
                      className={`text-xl font-semibold ${
                        financialResults.profitability?.isProfitable
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {financialResults.profitability?.isProfitable ? "Profitable" : "Not Profitable"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">EBITDA Margin:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      {financialResults.profitability?.EBITDAMargin?.toFixed(2) || "N/A"}%
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Debt Coverage Ratio:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      {financialResults.profitability?.debtCoverageRatio?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Market Potential Index:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      {financialResults.scoring?.marketPotentialIndex || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Recommendation:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      {financialResults.scoring?.recommendation || "N/A"}
                    </p>
                  </div>
                </div>
              </div>,
              "bg-gray-50"
            )
          )}

          {/* Yearly Financial Plan */}
          {yearlyPlan.length > 0 &&
            renderSection(
              "Yearly Financial Plan",
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="py-3 px-4 text-left">Year</th>
                        <th className="py-3 px-4 text-left">Revenue (€)</th>
                        <th className="py-3 px-4 text-left">Expenses (€)</th>
                        <th className="py-3 px-4 text-left">Product Costs (€)</th>
                        <th className="py-3 px-4 text-left">Gross Margin (€)</th>
                        <th className="py-3 px-4 text-left">Value Added (€)</th>
                        <th className="py-3 px-4 text-left">EBITDA (€)</th>
                        <th className="py-3 px-4 text-left">Cash Flow (€)</th>
                        <th className="py-3 px-4 text-left">Staff Costs (€)</th>
                        <th className="py-3 px-4 text-left">Intermediate Consumption (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlyPlan.map((year, index) => (
                        <tr
                          key={year.year}
                          className={`border-t ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-blue-50 transition`}
                        >
                          <td className="py-3 px-4">{year.year}</td>
                          <td className="py-3 px-4">{year.revenue.toFixed(2)}</td>
                          <td className="py-3 px-4">{year.expenses.toFixed(2)}</td>
                          <td className="py-3 px-4">{year.productCosts.toFixed(2)}</td>
                          <td className="py-3 px-4">{year.grossMargin.toFixed(2)}</td>
                          <td className="py-3 px-4">{year.valueAdded.toFixed(2)}</td>
                          <td className="py-3 px-4">{year.EBITDA.toFixed(2)}</td>
                          <td className="py-3 px-4">{year.cashFlow.toFixed(2)}</td>
                          <td className="py-3 px-4">{year.staffCosts.toFixed(2)}</td>
                          <td className="py-3 px-4">{year.intermediateConsumption.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {isLimitedPlan && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-lg animate-pulse">
                    <div className="flex items-center">
                      <FaLock className="text-3xl mr-4" />
                      <div>
                        <h3 className="text-xl font-bold">Unlock Full 5-Year Financial Report</h3>
                        <p className="mt-2">
                          Your current plan shows data for {yearlyPlan.length} years. Upgrade to our Premium Plan to access the complete 5-year financial projections and gain deeper insights into your business potential.
                        </p>
                        <a
                          href="/pricingplan"
                          className="mt-4 inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                        >
                          Upgrade Now
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          {/* Financial Charts */}
          {yearlyPlan.length > 0 && (
            <>
              {renderSection(
                "Financial Results - Bar Chart",
                <div className="chart-container" data-title="Financial Results - Bar Chart">
                  <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={400}
                  />
                  {isLimitedPlan && (
                    <p className="mt-2 text-sm text-gray-600">
                      Showing data for {yearlyPlan.length} years. Upgrade to view 5-year projections.
                    </p>
                  )}
                </div>
              )}
              {renderSection(
                "Financial Results - Line Chart",
                <div className="chart-container" data-title="Financial Results - Line Chart">
                  <Chart
                    options={lineChartData.options}
                    series={lineChartData.series}
                    type="line"
                    height={400}
                  />
                  {isLimitedPlan && (
                    <p className="mt-2 text-sm text-gray-600">
                      Showing data for {yearlyPlan.length} years. Upgrade to view 5-year projections.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;