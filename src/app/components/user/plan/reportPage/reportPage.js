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
      if (!planId) {
        setError("No Plan Id Found");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized. Please log in first.");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          "/api/generatereport/result",
          { planId, token }
        );
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
    const container = document.querySelector(".report-container");

    if (container) {
      const canvas = await html2canvas(container, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      doc.setFontSize(16);
      doc.text(reportData?.projectName || "Business Report", 10, 10);

      while (position < imgHeight) {
        doc.addImage(imgData, "PNG", 10, 20 - position, imgWidth, imgHeight);
        position += pageHeight - 30;
        if (position < imgHeight) doc.addPage();
      }
    }

    doc.save(`${reportData?.projectName || "report"}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-200">
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
    ],
    options: {
      chart: { type: "bar", height: 350, toolbar: { show: true } },
      plotOptions: { bar: { horizontal: false, columnWidth: "55%" } },
      colors: ["#3b82f6", "#ef4444", "#10b981"],
      dataLabels: { enabled: false },
      xaxis: { categories: yearlyPlan.map((year) => year.year) },
      yaxis: { title: { text: "Amount (€)" } },
      tooltip: { y: { formatter: (val) => `€${val.toFixed(2)}` } },
    },
  };

  const lineChartData = {
    series: [
      { name: "Gross Margin", data: yearlyPlan.map((year) => year.grossMargin) },
      { name: "Cash Flow", data: yearlyPlan.map((year) => year.cashFlow) },
    ],
    options: {
      chart: { type: "line", height: 350, zoom: { enabled: false } },
      colors: ["#8b5cf6", "#f97316"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      xaxis: { categories: yearlyPlan.map((year) => year.year) },
      yaxis: { title: { text: "Amount (€)" } },
      tooltip: { y: { formatter: (val) => `€${val.toFixed(2)}` } },
    },
  };

  const isLimitedPlan = yearlyPlan.length === 2;

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
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
<aside className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <strong className="text-lg text-gray-700">Project Name:</strong>
                <p className="text-gray-600">{reportData.projectName}</p>
              </div>
              <div>
                <strong className="text-lg text-gray-700">Type of Activity:</strong>
                <p className="text-gray-600">{reportData.typeOfActivity}</p>
              </div>
              <div>
                <strong className="text-lg text-gray-700">Address:</strong>
                <p className="text-gray-600">{reportData.address}</p>
              </div>
              <div>
                <strong className="text-lg text-gray-700">Launch Date:</strong>
                <p className="text-gray-600">
                  {new Date(reportData.launchDate).toLocaleDateString()}
                </p>
              </div>
            </aside>
          )}

          {/* Presentation */}
          {reportData.presentation &&
            renderSection(
              "Presentation",
              Object.values(reportData.presentation).map((value, index) => (
                <div
                  key={index}
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              ))
            )}

          {/* Visiting Cards */}
          {reportData.visitingCard &&
            renderSection(
              "Visiting Cards",
              Object.values(reportData.visitingCard).map((card, index) => (
                <div
                  key={card._id}
                  className="border-l-4 border-blue-600 pl-4 mb-4"
                >
                  <p>
                    <strong>Name:</strong> {`${card.firstName} ${card.lastName}`}
                  </p>
                  <p>
                    <strong>Title:</strong> {card.title}
                  </p>
                  <p>
                    <strong>Contact:</strong> {card.contact}
                  </p>
                  <p>
                    <strong>Email:</strong> {card.email}
                  </p>
                  <p>
                    <strong>Country:</strong>{" "}
                    {`${card.selectedCountry.flag} ${card.selectedCountry.name} (${card.selectedCountry.code})`}
                  </p>
                </div>
              ))
            )}

          {/* Carrier Information */}
          {reportData.carrier &&
            renderSection(
              "Carrier Information",
              Object.values(reportData.carrier).map((data, index) => (
                <div key={data._id}>
                  <p>
                    <strong>Business Leader:</strong>{" "}
                    {data.businessLeader === "yes" ? "Yes" : "No=Yes" ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Industry Experience:</strong>{" "}
                    {data.industryExperience === "yes" ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Family Situation:</strong>{" "}
                    {data.familySituation === "yes" ? "Yes" : "No"}
                  </p>
                  <div
                    className="prose max-w-none mt-2"
                    dangerouslySetInnerHTML={{ __html: data.editorContent }}
                  />
                </div>
              ))
            )}

          {/* Services */}
          {reportData.services &&
            renderSection(
              "Services",
              Object.values(reportData.services).map((service, index) => (
                <div key={service._id} className="mb-4">
                  <p className="text-lg font-semibold">{service.name}</p>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                </div>
              ))
            )}

          {/* Market Analysis */}
          {reportData.market &&
            renderSection(
              "Market Analysis",
              Object.values(reportData.market).map((market, index) => (
                <div key={market._id}>
                  <div className="mb-4">
                    <strong className="text-lg">Market Description:</strong>
                    <div
                      className="prose max-w-none mt-2"
                      dangerouslySetInnerHTML={{ __html: market.marketDescription }}
                    />
                  </div>
                  <div>
                    <strong className="text-lg">Market Responses:</strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {Object.entries(market.responses).map(([key, value]) => (
                        <div
                          key={key}
                          className={`p-4 rounded-lg shadow ${
                            value === "Positive"
                              ? "bg-green-100"
                              : value === "Negative"
                              ? "bg-red-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <strong>{key.replace("row", "Question ")}:</strong> {value}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}

          {/* Competitors */}
          {reportData.competitors &&
            renderSection(
              "Competitors",
              Object.values(reportData.competitors)
                .flat()
                .map((competitor, index) => (
                  <div key={competitor._id} className="flex items-center mb-4">
                    <div className="flex-1">
                      <p>
                        <strong>Name:</strong> {competitor.name}
                      </p>
                      <p>
                      <strong>Price Status:</strong> {competitor.priceStatus}
                      </p>
                    </div>
                  </div>
                ))
            )}

          {/* Customers */}
          {reportData.customers &&
            renderSection(
              "Customers",
              Object.values(reportData.customers).map((customer, index) => (
                <div key={customer._id} className="mb-4">
                  <p className="text-lg font-semibold">{customer.name}</p>
                  <p>
                    <strong>Type:</strong> {customer.type}
                  </p>
                  <div
                    className="prose max-w-none mt-2"
                    dangerouslySetInnerHTML={{ __html: customer.description }}
                  />
                </div>
              ))
            )}

          {/* Sales Pitches */}
          {reportData.salesPitches &&
            renderSection(
              "Sales Pitches",
              Object.values(reportData.salesPitches).map((pitch, index) => (
                <div
                  key={index}
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: pitch }}
                />
              ))
            )}

          {/* Customer Acquisition Actions */}
          {reportData.customerAcquisitionActions &&
            renderSection(
              "Customer Acquisition Actions",
              Object.values(reportData.customerAcquisitionActions)
                .flat()
                .map((action, index) => (
                  <div key={action._id} className="mb-4">
                    <p className="text-lg font-semibold">{action.name}</p>
                    <p>
                      <strong>ID:</strong> {action.id}
                    </p>
                    <div
                      className="prose max-w-none mt-2"
                      dangerouslySetInnerHTML={{ __html: action.description }}
                    />
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
                      €{financialResults.totalRevenue.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Gross Margin:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.grossMargin.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Total Charges:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.totalCharges.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Added Value:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.addedValue.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Total Salaries:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.totalSalaries.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">EBITDA:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.EBITDA.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Profitability:</strong>
                    <p
                      className={`text-xl font-semibold ${
                        financialResults.profitability.isProfitable
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {financialResults.profitability.isProfitable
                        ? "Profitable"
                        : "Not Profitable"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">EBITDA Margin:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      {financialResults.profitability.EBITDAMargin.toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">Debt Coverage Ratio:</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      {financialResults.profitability.debtCoverageRatio.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <strong className="text-lg">Scoring:</strong>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <p>
                      <strong>Market Potential Index:</strong>{" "}
                      {financialResults.scoring.marketPotentialIndex}
                    </p>
                    <p>
                      <strong>Recommendation:</strong>{" "}
                      {financialResults.scoring.recommendation}
                    </p>
                  </div>
                </div>
              </div>,
              "bg-gray-50"
            )
          )}

          {/* Yearly Plan Table */}
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
                        <th className="py-3 px-4 text-left">Gross Margin (€)</th>
                        <th className="py-3 px-4 text-left">Added Value (€)</th>
                        <th className="py-3 px-4 text-left">EBITDA (€)</th>
                        <th className="py-3 px-4 text-left">Cash Flow (€)</th>
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
                          <td className="py-3 px-4">
                            {year.revenue.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            {year.expenses.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            {year.grossMargin.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            {year.addedValue.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">{year.EBITDA.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            {year.cashFlow.toFixed(2)}
                          </td>
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
                        <h3 className="text-xl font-bold">
                          Unlock Full 5-Year Financial Report
                        </h3>
                        <p className="mt-2">
                          Your current plan shows data for {yearlyPlan.length}{" "}
                          years. Upgrade to our Premium Plan to access the complete
                          5-year financial projections and gain deeper insights
                          into your business potential.
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
                <div>
                  <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={400}
                  />
                  {isLimitedPlan && (
                    <p className="mt-2 text-sm text-gray-600">
                      Showing data for {yearlyPlan.length} years. Upgrade to view
                      5-year projections.
                    </p>
                  )}
                </div>
              )}
              {renderSection(
                "Financial Results - Line Chart",
                <div>
                  <Chart
                    options={lineChartData.options}
                    series={lineChartData.series}
                    type="line"
                    height={400}
                  />
                  {isLimitedPlan && (
                    <p className="mt-2 text-sm text-gray-600">
                      Showing data for {yearlyPlan.length} years. Upgrade to view
                      5-year projections.
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