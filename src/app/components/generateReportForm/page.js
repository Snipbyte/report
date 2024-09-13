"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts with SSR disabled
const ApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const GenerateReportForm = () => {
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
      const token = localStorage.getItem("userToken");
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
      } else {
        setError(data.message || "Error generating the business plan");
      }
    } catch (error) {
      setError("Failed to generate the business plan");
    }
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
            Company Name
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
            Industry Sector
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
            Date of Establishment
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
            Location
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
          <h2 className="text-lg font-semibold">Revenues</h2>
          <label className="block text-sm font-medium text-gray-700">
            Unit Price
          </label>
          <input
            type="number"
            name="revenues.unitPrice"
            value={formData.revenues.unitPrice}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Expected Yearly Sales Quantity
          </label>
          <input
            type="number"
            name="revenues.expectedYearlySalesQuantity"
            value={formData.revenues.expectedYearlySalesQuantity}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Estimated Sales Growth
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
          <h2 className="text-lg font-semibold">Costs</h2>
          <label className="block text-sm font-medium text-gray-700">
            Yearly Fixed Costs
          </label>
          <input
            type="number"
            name="costs.yearlyFixedCosts"
            value={formData.costs.yearlyFixedCosts}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Variable Unit Costs
          </label>
          <input
            type="number"
            name="costs.variableUnitCosts"
            value={formData.costs.variableUnitCosts}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
        </div>

        {/* Financing Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Investments & Financing</h2>
          <label className="block text-sm font-medium text-gray-700">
            Initial Investments
          </label>
          <input
            type="number"
            name="investmentsAndFinancing.initialInvestments"
            value={formData.investmentsAndFinancing.initialInvestments}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />

          <label className="block text-sm font-medium text-gray-700 mt-4">
            Loan Duration (years)
          </label>
          <input
            type="number"
            name="investmentsAndFinancing.loanDuration"
            value={formData.investmentsAndFinancing.loanDuration}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Interest Rate (%)
          </label>
          <input
            type="number"
            name="investmentsAndFinancing.interestRate" // Updated key name
            value={formData.investmentsAndFinancing.interestRate}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
        </div>

        {/* Other Financial Assumptions Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Other Financial Assumptions</h2>
          <label className="block text-sm font-medium text-gray-700">
            Tax Rate (%)
          </label>
          <input
            type="number"
            name="otherFinancialAssumptions.taxRate"
            value={formData.otherFinancialAssumptions.taxRate}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 text-white py-2 mt-4 hover:bg-blue-700"
        >
          Generate Business Plan
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
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                    Purchase Plan
                  </button>
                </div>
              </div>
            )}
          </div>
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
