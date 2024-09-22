"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import jsPDF from "jspdf";
import Link from "next/link";
import { useTranslation } from "react-i18next";

// Dynamically import ApexCharts with SSR disabled
const ApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const GenerateReportForm = () => {
  const { t } = useTranslation(); 
  const [formData, setFormData] = useState({
    companyName: "",
    industrySector: "",
    dateOfEstablishment: "",
    location: "",
    revenues: {
      unitPrice: "",
      expectedYearlySalesQuantity: "",
      estimatedSalesGrowth: "",
    },
    costs: {
      yearlyFixedCosts: "",
      variableUnitCosts: "",
      costGrowth: "",
    },
    investmentsAndFinancing: {
      initialInvestments: "",
      loanDuration: "",
      interestRate: "",
    },
    otherFinancialAssumptions: {
      taxRate: "",
    },
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLimitedAccess, setIsLimitedAccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split(".");
    if (child) {
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const dataToSubmit = {
      ...formData,
      revenues: {
        ...formData.revenues,
        unitPrice: String(formData.revenues.unitPrice),
        expectedYearlySalesQuantity: String(
          formData.revenues.expectedYearlySalesQuantity
        ),
        estimatedSalesGrowth: String(formData.revenues.estimatedSalesGrowth),
      },
      costs: {
        ...formData.costs,
        yearlyFixedCosts: String(formData.costs.yearlyFixedCosts),
        variableUnitCosts: String(formData.costs.variableUnitCosts),
        costGrowth: String(formData.costs.costGrowth),
      },
      investmentsAndFinancing: {
        ...formData.investmentsAndFinancing,
        initialInvestments: String(
          formData.investmentsAndFinancing.initialInvestments
        ),
        loanDuration: String(formData.investmentsAndFinancing.loanDuration),
        interestRate: String(formData.investmentsAndFinancing.interestRate),
      },
      otherFinancialAssumptions: {
        ...formData.otherFinancialAssumptions,
        taxRate: String(formData.otherFinancialAssumptions.taxRate),
      },
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/generatebusinessplan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSubmit),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.limitedData || data.financialProjections);
        setIsLimitedAccess(!!data.limitedData);
        setActiveTab(0);
        setIsLoading(false);
      } else {
        setError(data.message || "Error generating the business plan");
        setIsLoading(false);
      }
    } catch (error) {
      setError("Failed to generate the business plan");
      setIsLoading(false);
    }
  };

  // for pdf
  // Function to generate and download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add title and relevant data to PDF
    doc.text("Business Plan Report", 20, 20);
    doc.text(`Company Name: ${formData.companyName}`, 20, 30);
    doc.text(`Industry Sector: ${formData.industrySector}`, 20, 40);
    doc.text(`Date of Establishment: ${formData.dateOfEstablishment}`, 20, 50);
    doc.text(`Location: ${formData.location}`, 20, 60);

    // Add chart data to PDF (simplified for example)
    doc.text("Financial Projections:", 20, 70);
    result?.forEach((proj, index) => {
      doc.text(
        `Year ${proj.year} - Revenues: ${proj.annualRevenues}, Expenses: ${proj.annualExpenses}, Net Income: ${proj.netIncome}`,
        20,
        80 + index * 10
      );
    });

    // Save the PDF
    doc.save("business_plan_report.pdf");
  };

  // ApexChart Options for Bar Chart and Line Chart
  const barChartOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: result?.map((proj) => `Year ${proj.year}`) || [],
    },
  };

  const barChartSeries = [
    {
      name: "Revenues",
      data: result?.map((proj) => proj.annualRevenues) || [],
    },
    {
      name: "Expenses",
      data: result?.map((proj) => proj.annualExpenses) || [],
    },
  ];

  const lineChartOptions = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: result?.map((proj) => `Year ${proj.year}`) || [],
    },
  };

  const lineChartSeries = [
    {
      name: "Net Income",
      data: result?.map((proj) => proj.netIncome) || [],
    },
    {
      name: "Cash Flow",
      data: result?.map((proj) => proj.cashFlow) || [],
    },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Company Details Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {t("companyName")}
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {t("industrySector")}
          </label>
          <input
            type="text"
            name="industrySector"
            value={formData.industrySector}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {t("dateOfEstablishment")}
          </label>
          <input
            type="date"
            name="dateOfEstablishment"
            value={formData.dateOfEstablishment}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {t("location")}
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
        </div>

        {/* Revenue Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{t("revenues")}</h2>
          <label className="block text-sm font-medium text-gray-700">
            {t("unitPrice")}
          </label>
          <input
            type="number"
            name="revenues.unitPrice"
            value={formData.revenues.unitPrice}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            {t("expectedYearlySalesQuantity")}
          </label>
          <input
            type="number"
            name="revenues.expectedYearlySalesQuantity"
            value={formData.revenues.expectedYearlySalesQuantity}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            {t("estimatedSalesGrowth")}
          </label>
          <input
            type="number"
            name="revenues.estimatedSalesGrowth"
            value={formData.revenues.estimatedSalesGrowth}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
        </div>

        {/* Costs Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{t("costs")}</h2>
          <label className="block text-sm font-medium text-gray-700">
            {t("yearlyFixedCosts")}
          </label>
          <input
            type="number"
            name="costs.yearlyFixedCosts"
            value={formData.costs.yearlyFixedCosts}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            {t("variableUnitCosts")}
          </label>
          <input
            type="number"
            name="costs.variableUnitCosts"
            value={formData.costs.variableUnitCosts}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            {t("costGrowth")}
          </label>
          <input
            type="number"
            name="costs.costGrowth"
            value={formData.costs.costGrowth}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
        </div>

        {/* Investments and Financing Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{t("investmentsAndFinancing")}</h2>
          <label className="block text-sm font-medium text-gray-700">
            {t("initialInvestments")}
          </label>
          <input
            type="number"
            name="investmentsAndFinancing.initialInvestments"
            value={formData.investmentsAndFinancing.initialInvestments}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            {t("loanDuration")}
          </label>
          <input
            type="number"
            name="investmentsAndFinancing.loanDuration"
            value={formData.investmentsAndFinancing.loanDuration}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            {t("interestRate")}
          </label>
          <input
            type="number"
            name="investmentsAndFinancing.interestRate"
            value={formData.investmentsAndFinancing.interestRate}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
        </div>

        {/* Other Financial Assumptions Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{t("otherFinancialAssumptions")}</h2>
          <label className="block text-sm font-medium text-gray-700">
            {t("taxRate")}
          </label>
          <input
            type="number"
            name="otherFinancialAssumptions.taxRate"
            value={formData.otherFinancialAssumptions.taxRate}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
        </div>

        {/* Generate Report Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 focus:outline-none"
        >
          {t("generateReport")}
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Generated Business Plan:</h3>

          {/* Render Bar Chart */}
          <div className="my-6">
            <h4 className="text-lg font-semibold mb-4">
              Bar Chart (Revenues vs Expenses)
            </h4>
            <ApexCharts
              options={barChartOptions}
              series={barChartSeries}
              type="bar"
              height={350}
            />
          </div>

          {/* Render Line Chart */}
          <div className="my-6">
            <h4 className="text-lg font-semibold mb-4">
              Line Chart (Net Income and Cash Flow)
            </h4>
            <ApexCharts
              options={lineChartOptions}
              series={lineChartSeries}
              type="line"
              height={350}
            />
          </div>

          {/* Tabs to display years */}
          <div className="relative">
            <div className="mb-4 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {result.map((projection, index) => (
                  <button
                    key={index}
                    className={`${
                      activeTab === index
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                    onClick={() => setActiveTab(index)}
                  >
                    Year {projection.year}
                  </button>
                ))}
              </nav>
            </div>

            {/* Display the data for the selected year */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">
                Year {result[activeTab].year}
              </h4>
              <p className="text-gray-700">
                <strong>Annual Revenues:</strong> $
                {result[activeTab].annualRevenues}
              </p>
              <p className="text-gray-700">
                <strong>Annual Expenses:</strong> $
                {result[activeTab].annualExpenses}
              </p>
              <p className="text-gray-700">
                <strong>Net Income:</strong> ${result[activeTab].netIncome}
              </p>
              <p className="text-gray-700">
                <strong>Cash Flow:</strong> ${result[activeTab].cashFlow}
              </p>
              {/* {result[activeTab].loanAmortization && (
                <p className="text-gray-700">
                  <strong>Loan Amortization:</strong> $
                  {result[activeTab].loanAmortization}
                </p>
              )} */}
            </div>

            {/* Blur section only for limited access (2-year data) */}
            {isLimitedAccess && (
              <div className="absolute inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-semibold text-gray-600">
                    Limited access. Upgrade to view full report.
                  </p>
                  <Link
                    href="/pricingplan"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Purchase Plan
                  </Link>
                </div>
              </div>
            )}
          </div>
          {/* Download PDF Button */}
          <button
            onClick={downloadPDF}
            className="w-full rounded-md bg-green-600 text-white py-2 mt-4 hover:bg-green-700"
          >
            Download PDF
          </button>
        </div>
      )}

      {error && (
        <div className="mt-6 text-red-600">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateReportForm;
