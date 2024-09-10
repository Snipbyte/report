// components/GenerateReportForm.js
"use client";
import React, { useState } from "react";

const GenerateReportForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    industrySector: "",
    dateOfEstablishment: "",
    location: "",
    revenues: {
      unitPrice: "",
      expectedMonthlySalesQuantity: "",
      estimatedSalesGrowth: "",
    },
    costs: {
      monthlyFixedCosts: "",
      variableUnitCosts: "",
      costGrowth: "",
    },
    investmentsAndFinancing: {
      initialInvestments: "",
      loanDuration: "",
      interestRate: "", // Corrected the key name
    },
    otherFinancialAssumptions: {
      taxRate: "",
    },
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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

    // Convert necessary string fields to numbers
    const dataToSubmit = {
      ...formData,
      revenues: {
        ...formData.revenues,
        unitPrice: Number(formData.revenues.unitPrice),
        expectedMonthlySalesQuantity: Number(
          formData.revenues.expectedMonthlySalesQuantity
        ),
        estimatedSalesGrowth: Number(formData.revenues.estimatedSalesGrowth),
      },
      costs: {
        ...formData.costs,
        monthlyFixedCosts: Number(formData.costs.monthlyFixedCosts),
        variableUnitCosts: Number(formData.costs.variableUnitCosts),
        costGrowth: Number(formData.costs.costGrowth), // Assuming this is required as a number
      },
      investmentsAndFinancing: {
        ...formData.investmentsAndFinancing,
        initialInvestments: Number(
          formData.investmentsAndFinancing.initialInvestments
        ),
        loanDuration: Number(formData.investmentsAndFinancing.loanDuration),
        interestRate: Number(formData.investmentsAndFinancing.interestRate), // Use interestRate instead of interestRates
      },
      otherFinancialAssumptions: {
        ...formData.otherFinancialAssumptions,
        taxRate: Number(formData.otherFinancialAssumptions.taxRate),
      },
    };

    try {
      const response = await fetch("/api/generatebusinessplan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.businessPlan);
      } else {
        setError(data.message || "Error generating the business plan");
      }
    } catch (error) {
      setError("Failed to generate the business plan");
    }
  };

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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Expected Monthly Sales Quantity
          </label>
          <input
            type="number"
            name="revenues.expectedMonthlySalesQuantity"
            value={formData.revenues.expectedMonthlySalesQuantity}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Estimated Sales Growth
          </label>
          <input
            type="number"
            name="revenues.estimatedSalesGrowth"
            value={formData.revenues.estimatedSalesGrowth}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
        </div>

        {/* Costs Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Costs</h2>
          <label className="block text-sm font-medium text-gray-700">
            Monthly Fixed Costs
          </label>
          <input
            type="number"
            name="costs.monthlyFixedCosts"
            value={formData.costs.monthlyFixedCosts}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Variable Unit Costs
          </label>
          <input
            type="number"
            name="costs.variableUnitCosts"
            value={formData.costs.variableUnitCosts}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Loan Duration (years)
          </label>
          <input
            type="number"
            name="investmentsAndFinancing.loanDuration"
            value={formData.investmentsAndFinancing.loanDuration}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Interest Rate (%)
          </label>
          <input
            type="number"
            name="investmentsAndFinancing.interestRate" // Updated key name
            value={formData.investmentsAndFinancing.interestRate}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 border border-gray-400"
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
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(result, null, 2)}
          </pre>
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
