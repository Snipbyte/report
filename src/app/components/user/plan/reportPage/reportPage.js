"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { FaDownload, FaLock } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Header from "@/app/components/common/header/page";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ReportPage = () => {
  const { t } = useTranslation();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      const planId = localStorage.getItem("planId");
      const token = localStorage.getItem("token");

      if (!planId) {
        setError(t("noPlanIdFound"));
        setLoading(false);
        return;
      }
      if (!token) {
        setError(t("unauthorizedPleaseLogIn"));
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
        setError(err.response?.data?.message || t("failedToFetchReportData"));
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [t]);

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
    doc.text(reportData?.projectName || t("businessReport"), margin, 50);
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    
    doc.setFontSize(12);
    doc.text(t("preparedBy"), margin, pageHeight - 20);
    doc.addPage();

    // Financial Table
    if (reportData?.financialResults?.yearlyPlan?.length > 0) {
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text(t("yearlyFinancialPlan"), margin, 20);
      doc.autoTable({
        startY: 30,
        head: [
          [
            t("year"),
            t("revenue"),
            t("expenses"),
            t("productCosts"),
            t("grossMargin"),
            t("valueAdded"),
            t("ebitda"),
            t("cashFlow"),
            t("staffCosts"),
            t("intermediateConsumption"),
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
      doc.text(t("financialResults"), margin, 20);
      doc.autoTable({
        startY: 30,
        head: [[t("metric"), t("value")]],
        body: [
          [t("totalRevenueLabel"), reportData.financialResults.totalRevenue?.toFixed(2) || "N/A"],
          [t("totalProductCostsLabel"), reportData.financialResults.totalProductCosts?.toFixed(2) || "N/A"],
          [t("grossMarginLabel"), reportData.financialResults.grossMargin?.toFixed(2) || "N/A"],
          [t("grossMarginPercentageLabel"), reportData.financialResults.grossMarginPercentage?.toFixed(2) || "N/A"],
          [t("totalChargesLabel"), reportData.financialResults.totalCharges?.toFixed(2) || "N/A"],
          [t("valueAddedLabel"), reportData.financialResults.valueAdded?.toFixed(2) || "N/A"],
          [t("valueAddedPercentageLabel"), reportData.financialResults.valueAddedPercentage?.toFixed(2) || "N/A"],
          [t("totalSalariesLabel"), reportData.financialResults.totalSalaries?.toFixed(2) || "N/A"],
          [t("ebitdaLabel"), reportData.financialResults.EBITDA?.toFixed(2) || "N/A"],
          [t("profitabilityLabel"), reportData.financialResults.profitability?.isProfitable ? t("profitabilityProfitable") : t("profitabilityNotProfitable")],
          [t("ebitdaMarginLabel"), reportData.financialResults.profitability?.EBITDAMargin?.toFixed(2) || "N/A"],
          [t("debtCoverageRatioLabel"), reportData.financialResults.profitability?.debtCoverageRatio?.toFixed(2) || "N/A"],
          [t("marketPotentialIndexLabel"), reportData.financialResults.scoring?.marketPotentialIndex || "N/A"],
          [t("recommendationLabel"), reportData.financialResults.scoring?.recommendation || "N/A"],
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
      doc.text(t(chart.dataset.title), margin, chartY);
      doc.addImage(imgData, "PNG", margin, chartY + 10, imgWidth, imgHeight);
      chartY += imgHeight + 30;
    }

    // Other Sections
    const sections = [
      {
        title: t("generalInformation"),
        data: [
          [t("projectNameLabel"), reportData?.projectName || "N/A"],
          [t("typeOfActivityLabel"), reportData?.typeOfActivity || "N/A"],
          [t("addressLabel"), reportData?.address || "N/A"],
          [t("launchDateLabel"), reportData?.launchDate ? new Date(reportData.launchDate).toLocaleDateString() : "N/A"],
        ],
      },
      {
        title: t("presentation"),
        data: reportData?.presentation
          ? Object.entries(reportData.presentation).map(([key, value]) => [t("contentKey", { key }), value.replace(/<[^>]+>/g, "")])
          : [],
      },
      {
        title: t("visitingCard"),
        data: reportData?.visitingCard
          ? Object.values(reportData.visitingCard).map((card) => [
              [t("idLabel"), card._id || "N/A"],
              [t("nameLabel"), `${card.firstName} ${card.lastName}`],
              [t("titleLabel"), card.title || "N/A"],
              [t("contactLabel"), card.contact || "N/A"],
              [t("emailLabel"), card.email || "N/A"],
              [t("countryLabel"), `${card.selectedCountry?.flag || ""} ${card.selectedCountry?.name || "N/A"} (${card.selectedCountry?.code || "N/A"})`],
            ]).flat()
          : [],
      },
      {
        title: t("carrierInformation"),
        data: reportData?.carrier
          ? Object.values(reportData.carrier).map((c) => [
              [t("idLabel"), c._id || "N/A"],
              [t("businessLeaderLabel"), c.businessLeader === "yes" ? t("businessLeaderYes") : t("businessLeaderNo")],
              [t("industryExperienceLabel"), c.industryExperience === "yes" ? t("industryExperienceYes") : t("industryExperienceNo")],
              [t("familySituationLabel"), c.familySituation === "yes" ? t("familySituationYes") : t("familySituationNo")],
              [t("detailsLabel"), c.editorContent?.replace(/<[^>]+>/g, "") || "N/A"],
            ]).flat()
          : [],
      },
      {
        title: t("services"),
        data: reportData?.services
          ? Object.values(reportData.services).map((s) => [
              [t("idLabel"), s._id || "N/A"],
              [t("nameLabel"), s.name || "N/A"],
              [t("descriptionLabel"), s.description?.replace(/<[^>]+>/g, "") || "N/A"],
            ]).flat()
          : [],
      },
      {
        title: t("marketAnalysis"),
        data: reportData?.market
          ? Object.values(reportData.market).map((m) => [
              [t("idLabel"), m._id || "N/A"],
              [t("descriptionLabel"), m.marketDescription?.replace(/<[^>]+>/g, "") || "N/A"],
              ...Object.entries(m.responses || {}).map(([k, v]) => [t("question", { number: k.replace("row", "") }), v || "N/A"]),
            ]).flat()
          : [],
      },
      {
        title: t("competitors"),
        data: reportData?.competitors
          ? Object.values(reportData.competitors).flat().map((c) => [
              [t("idLabel"), c._id || "N/A"],
              [t("nameLabel"), c.name || "N/A"],
              [t("priceStatusLabel"), c.priceStatus || "N/A"],
            ]).flat()
          : [],
      },
      {
        title: t("customers"),
        data: reportData?.customers
          ? Object.values(reportData.customers).map((c) => [
              [t("idLabel"), c._id || "N/A"],
              [t("nameLabel"), c.name || "N/A"],
              [t("typeLabel"), c.type || "N/A"],
              [t("descriptionLabel"), c.description?.replace(/<[^>]+>/g, "") || "N/A"],
            ]).flat()
          : [],
      },
      {
        title: t("salesPitches"),
        data: reportData?.salesPitches
          ? Object.entries(reportData.salesPitches).map(([key, value]) => [t("contentKey", { key }), value.replace(/<[^>]+>/g, "")])
          : [],
      },
      {
        title: t("customerAcquisitionActions"),
        data: reportData?.customerAcquisitionActions
          ? Object.values(reportData.customerAcquisitionActions).flat().map((a) => [
              [t("idLabel"), a._id || "N/A"],
              [t("actionIdLabel"), a.id || "N/A"],
              [t("nameLabel"), a.name || "N/A"],
              [t("descriptionLabel"), a.description?.replace(/<[^>]+>/g, "") || "N/A"],
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
          head: [[t("field"), t("value")]],
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
          <h1 className="text-3xl font-bold text-red-600 mb-4">{t("error")}</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block bg-btnColor text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {t("goToHome")}
          </a>
        </div>
      </div>
    );
  }

  const renderSection = (titleKey, content, bgColor = "bg-white") => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
        {t(titleKey)}
      </h2>
      <div className={`${bgColor} shadow-lg p-6 rounded-xl`}>{content}</div>
    </div>
  );

  const financialResults = reportData?.financialResults || {};
  const yearlyPlan = financialResults.yearlyPlan || [];

  const chartData = {
    series: [
      { name: t("chartRevenue"), data: yearlyPlan.map((year) => year.revenue) },
      { name: t("chartExpenses"), data: yearlyPlan.map((year) => year.expenses) },
      { name: t("chartEbitda"), data: yearlyPlan.map((year) => year.EBITDA) },
      { name: t("chartValueAdded"), data: yearlyPlan.map((year) => year.valueAdded) },
    ],
    options: {
      chart: { type: "bar", height: 400, toolbar: { show: true } },
      plotOptions: { bar: { horizontal: false, columnWidth: "55%" } },
      colors: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"],
      dataLabels: { enabled: false },
      xaxis: { categories: yearlyPlan.map((year) => year.year), title: { text: t("year") } },
      yaxis: { title: { text: t("amountEur") } },
      tooltip: { y: { formatter: (val) => `€${val.toFixed(2)}` } },
      legend: { position: "top" },
    },
  };

  const lineChartData = {
    series: [
      { name: t("chartGrossMargin"), data: yearlyPlan.map((year) => year.grossMargin) },
      { name: t("chartCashFlow"), data: yearlyPlan.map((year) => year.cashFlow) },
      { name: t("chartStaffCosts"), data: yearlyPlan.map((year) => year.staffCosts) },
      { name: t("chartIntermediateConsumption"), data: yearlyPlan.map((year) => year.intermediateConsumption) },
    ],
    options: {
      chart: { type: "line", height: 400, zoom: { enabled: false } },
      colors: ["#8b5cf6", "#f97316", "#ec4899", "#6b7280"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      xaxis: { categories: yearlyPlan.map((year) => year.year), title: { text: t("year") } },
      yaxis: { title: { text: t("amountEur") } },
      tooltip: { y: { formatter: (val) => `€${val.toFixed(2)}` } },
      legend: { position: "top" },
    },
  };

  const isLimitedPlan = yearlyPlan.length === 2;

  // Debugging: Log current language and translations
  console.log("Current language:", t("language"));
  console.log("Translations:", {
    report: t("report"),
    downloadPdf: t("downloadPdf"),
  });

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {reportData?.projectName} {t("report")}
          </h1>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center bg-btnColor text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            <FaDownload className="mr-2" /> {t("downloadPdf")}
          </button>
        </div>
        <div className="report-container">
          {/* General Information */}
          {renderSection(
            "generalInformation",
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <strong className="text-lg text-gray-700">{t("projectNameLabel")}</strong>
                <p className="text-gray-600">{reportData?.projectName || "N/A"}</p>
              </div>
              <div>
                <strong className="text-lg text-gray-700">{t("typeOfActivityLabel")}</strong>
                <p className="text-gray-600">{reportData?.typeOfActivity || "N/A"}</p>
              </div>
              <div>
                <strong className="text-lg text-gray-700">{t("addressLabel")}</strong>
                <p className="text-gray-600">{reportData?.address || "N/A"}</p>
              </div>
              <div>
                <strong className="text-lg text-gray-700">{t("launchDateLabel")}</strong>
                <p className="text-gray-600">
                  {reportData?.launchDate ? new Date(reportData.launchDate).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          )}

          {/* Presentation */}
          {reportData?.presentation &&
            renderSection(
              "presentation",
              Object.entries(reportData.presentation).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <strong className="text-lg text-gray-700">{t("contentKey", { key })}</strong>
                  <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: value }} />
                </div>
              ))
            )}

          {/* Visiting Card */}
          {reportData?.visitingCard &&
            renderSection(
              "visitingCard",
              Object.values(reportData.visitingCard).map((card) => (
                <div key={card._id} className="border-l-4 border-blue-600 pl-4 mb-4">
                  <p><strong>{t("idLabel")}</strong> {card._id || "N/A"}</p>
                  <p><strong>{t("nameLabel")}</strong> {`${card.firstName} ${card.lastName}`}</p>
                  <p><strong>{t("titleLabel")}</strong> {card.title || "N/A"}</p>
                  <p><strong>{t("contactLabel")}</strong> {card.contact || "N/A"}</p>
                  <p><strong>{t("emailLabel")}</strong> {card.email || "N/A"}</p>
                  <p><strong>{t("countryLabel")}</strong> {`${card.selectedCountry?.flag || ""} ${card.selectedCountry?.name || "N/A"} (${card.selectedCountry?.code || "N/A"})`}</p>
                </div>
              ))
            )}

          {/* Carrier Information */}
          {reportData?.carrier &&
            renderSection(
              "carrierInformation",
              Object.values(reportData.carrier).map((data) => (
                <div key={data._id} className="mb-4">
                  <p><strong>{t("idLabel")}</strong> {data._id || "N/A"}</p>
                  <p><strong>{t("businessLeaderLabel")}</strong> {data.businessLeader === "yes" ? t("businessLeaderYes") : t("businessLeaderNo")}</p>
                  <p><strong>{t("industryExperienceLabel")}</strong> {data.industryExperience === "yes" ? t("industryExperienceYes") : t("industryExperienceNo")}</p>
                  <p><strong>{t("familySituationLabel")}</strong> {data.familySituation === "yes" ? t("familySituationYes") : t("familySituationNo")}</p>
                  <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: data.editorContent || "<p>N/A</p>" }} />
                </div>
              ))
            )}

          {/* Services */}
          {reportData?.services &&
            renderSection(
              "services",
              Object.values(reportData.services).map((service) => (
                <div key={service._id} className="mb-4">
                  <p><strong>{t("idLabel")}</strong> {service._id || "N/A"}</p>
                  <p className="text-lg font-semibold">{service.name || "N/A"}</p>
                  <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: service.description || "<p>N/A</p>" }} />
                </div>
              ))
            )}

          {/* Market Analysis */}
          {reportData?.market &&
            renderSection(
              "marketAnalysis",
              Object.values(reportData.market).map((market) => (
                <div key={market._id}>
                  <p><strong>{t("idLabel")}</strong> {market._id || "N/A"}</p>
                  <div className="mb-4">
                    <strong className="text-lg">{t("marketDescriptionLabel")}</strong>
                    <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: market.marketDescription || "<p>N/A</p>" }} />
                  </div>
                  <div>
                    <strong className="text-lg">{t("marketResponsesLabel")}</strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {Object.entries(market.responses || {}).map(([key, value]) => (
                        <div
                          key={key}
                          className={`p-4 rounded-lg shadow ${
                            value === "Positive" ? "bg-green-100" : value === "Negative" ? "bg-red-100" : "bg-gray-100"
                          }`}
                        >
                          <strong>{t("question", { number: key.replace("row", "") })}:</strong> {value || "N/A"}
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
              "competitors",
              Object.values(reportData.competitors).flat().map((competitor) => (
                <div key={competitor._id} className="flex items-center mb-4">
                  <div className="flex-1">
                    <p><strong>{t("idLabel")}</strong> {competitor._id || "N/A"}</p>
                    <p><strong>{t("nameLabel")}</strong> {competitor.name || "N/A"}</p>
                    <p><strong>{t("priceStatusLabel")}</strong> {competitor.priceStatus || "N/A"}</p>
                  </div>
                </div>
              ))
            )}

          {/* Customers */}
          {reportData?.customers &&
            renderSection(
              "customers",
              Object.values(reportData.customers).map((customer) => (
                <div key={customer._id} className="mb-4">
                  <p><strong>{t("idLabel")}</strong> {customer._id || "N/A"}</p>
                  <p className="text-lg font-semibold">{customer.name || "N/A"}</p>
                  <p><strong>{t("typeLabel")}</strong> {customer.type || "N/A"}</p>
                  <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: customer.description || "<p>N/A</p>" }} />
                </div>
              ))
            )}

          {/* Sales Pitches */}
          {reportData?.salesPitches &&
            renderSection(
              "salesPitches",
              Object.entries(reportData.salesPitches).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <strong className="text-lg">{t("contentKey", { key })}</strong>
                  <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: value || "<p>N/A</p>" }} />
                </div>
              ))
            )}

          {/* Customer Acquisition Actions */}
          {reportData?.customerAcquisitionActions &&
            renderSection(
              "customerAcquisitionActions",
              Object.values(reportData.customerAcquisitionActions).flat().map((action) => (
                <div key={action._id} className="mb-4">
                  <p><strong>{t("idLabel")}</strong> {action._id || "N/A"}</p>
                  <p><strong>{t("actionIdLabel")}</strong> {action.id || "N/A"}</p>
                  <p className="text-lg font-semibold">{action.name || "N/A"}</p>
                  <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: action.description || "<p>N/A</p>" }} />
                </div>
              ))
            )}

          {/* Financial Results */}
          {financialResults && (
            renderSection(
              "financialResults",
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <div>
                    <strong className="text-lg">{t("totalRevenueLabel")}</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.totalRevenue?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">{t("totalProductCostsLabel")}</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.totalProductCosts?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">{t("grossMarginLabel")}</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.grossMargin?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">{t("grossMarginPercentageLabel")}</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      {financialResults.grossMarginPercentage?.toFixed(2) || "N/A"}%
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">{t("totalChargesLabel")}</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.totalCharges?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">{t("valueAddedLabel")}</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.valueAdded?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">{t("valueAddedPercentageLabel")}</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      {financialResults.valueAddedPercentage?.toFixed(2) || "N/A"}%
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">{t("totalSalariesLabel")}</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.totalSalaries?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">{t("ebitdaLabel")}</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      €{financialResults.EBITDA?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">{t("profitabilityLabel")}</strong>
                    <p
                      className={`text-xl font-semibold ${
                        financialResults.profitability?.isProfitable
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {financialResults.profitability?.isProfitable ? t("profitabilityProfitable") : t("profitabilityNotProfitable")}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">{t("ebitdaMarginLabel")}</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      {financialResults.profitability?.EBITDAMargin?.toFixed(2) || "N/A"}%
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">{t("debtCoverageRatioLabel")}</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      {financialResults.profitability?.debtCoverageRatio?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">{t("marketPotentialIndexLabel")}</strong>
                    <p className="text-xl font-semibold text-blue-600">
                      {financialResults.scoring?.marketPotentialIndex || "N/A"}
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg">{t("recommendationLabel")}</strong>
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
              "yearlyFinancialPlan",
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-btnColor text-white">
                        <th className="py-3 px-4 text-left">{t("year")}</th>
                        <th className="py-3 px-4 text-left">{t("revenue")}</th>
                        <th className="py-3 px-4 text-left">{t("expenses")}</th>
                        <th className="py-3 px-4 text-left">{t("productCosts")}</th>
                        <th className="py-3 px-4 text-left">{t("grossMargin")}</th>
                        <th className="py-3 px-4 text-left">{t("valueAdded")}</th>
                        <th className="py-3 px-4 text-left">{t("ebitda")}</th>
                        <th className="py-3 px-4 text-left">{t("cashFlow")}</th>
                        <th className="py-3 px-4 text-left">{t("staffCosts")}</th>
                        <th className="py-3 px-4 text-left">{t("intermediateConsumption")}</th>
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
                        <h3 className="text-xl font-bold">{t("unlockFull5YearFinancialReport")}</h3>
                        <p className="mt-2">
                          {t("upgradeBannerMessage", { years: yearlyPlan.length })}
                        </p>
                        <a
                          href="/pricingplan"
                          className="mt-4 inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                        >
                          {t("upgradeNow")}
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
                "financialResultsBarChart",
                <div className="chart-container" data-title="financialResultsBarChart">
                  <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={400}
                  />
                  {isLimitedPlan && (
                    <p className="mt-2 text-sm text-gray-600">
                      {t("showingDataForYears", { years: yearlyPlan.length })}
                    </p>
                  )}
                </div>
              )}
              {renderSection(
                "financialResultsLineChart",
                <div className="chart-container" data-title="financialResultsLineChart">
                  <Chart
                    options={lineChartData.options}
                    series={lineChartData.series}
                    type="line"
                    height={400}
                  />
                  {isLimitedPlan && (
                    <p className="mt-2 text-sm text-gray-600">
                      {t("showingDataForYears", { years: yearlyPlan.length })}
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