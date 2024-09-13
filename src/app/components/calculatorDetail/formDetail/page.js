"use client";
import React, { useState } from "react";

const calculators = {
  breakeven: {
    label: "Break-Even Calculator",
    fields: [
      {
        id: "fixedCosts",
        label: "Fixed Costs",
        type: "number",
        placeholder: "1000",
      },
      {
        id: "variableCostPerUnit",
        label: "Variable Cost Per Unit",
        type: "number",
        placeholder: "5",
      },
      {
        id: "sellingPricePerUnit",
        label: "Selling Price Per Unit",
        type: "number",
        placeholder: "10",
      },
    ],
    api: "/api/breakeven",
  },
  businessValuation: {
    label: "Business Valuation Calculator",
    fields: [
      {
        id: "netProfit",
        label: "Net Profit",
        type: "number",
        placeholder: "50000",
      },
      {
        id: "growthRate",
        label: "Growth Rate (%)",
        type: "number",
        placeholder: "5",
      },
      {
        id: "discountRate",
        label: "Discount Rate (%)",
        type: "number",
        placeholder: "10",
      },
    ],
    api: "/api/businessvaluation",
  },
  cashflow: {
    label: "Cash Flow Calculator",
    fields: [
      { id: "month", label: "Month", type: "text", placeholder: "January" },
      {
        id: "cashInflows",
        label: "Cash Inflows",
        type: "number",
        placeholder: "10000",
      },
      {
        id: "cashOutflows",
        label: "Cash Outflows",
        type: "number",
        placeholder: "5000",
      },
      {
        id: "initialCashBalance",
        label: "Initial Cash Balance",
        type: "number",
        placeholder: "5000",
      },
    ],
    api: "/api/cashflow",
  },
  financialForecast: {
    label: "Financial Forecast Calculator",
    fields: [
      {
        id: "revenues",
        label: "Revenues",
        type: "number",
        placeholder: "20000",
      },
      {
        id: "fixedExpenses",
        label: "Fixed Expenses",
        type: "number",
        placeholder: "8000",
      },
      {
        id: "variableExpenses",
        label: "Variable Expenses",
        type: "number",
        placeholder: "5000",
      },
    ],
    api: "/api/financialforecast",
  },
  grossmargin: {
    label: "Gross Margin Calculator",
    fields: [
      {
        id: "product",
        label: "Product",
        type: "text",
        placeholder: "Product Name",
      },
      {
        id: "sellingPrice",
        label: "Selling Price",
        type: "number",
        placeholder: "15",
      },
      {
        id: "productionCost",
        label: "Production Cost",
        type: "number",
        placeholder: "8",
      },
    ],
    api: "/api/grossmargin",
  },
  roi: {
    label: "ROI Calculator",
    fields: [
      {
        id: "initialCost",
        label: "Initial Cost",
        type: "number",
        placeholder: "5000",
      },
      {
        id: "netGains",
        label: "Net Gains",
        type: "number",
        placeholder: "7000",
      },
    ],
    api: "/api/roi",
  },
  investment: {
    label: "Investment Calculator",
    fields: [
      {
        id: "monthlyIncome",
        label: "Monthly Income",
        type: "number",
        placeholder: "5000",
      },
      {
        id: "monthlyExpenses",
        label: "Monthly Expenses",
        type: "number",
        placeholder: "3000",
      },
      {
        id: "emergencySavings",
        label: "Emergency Savings",
        type: "number",
        placeholder: "1000",
      },
      {
        id: "regularContributions",
        label: "Regular Contributions",
        type: "number",
        placeholder: "200",
      },
    ],
    api: "/api/investmentcapacity",
  },
  financingSimulation: {
    label: "Financing Simulation Calculator",
    fields: [
      {
        id: "currentRevenue",
        label: "Current Revenue",
        type: "number",
        placeholder: "200000",
      },
      {
        id: "netProfit",
        label: "Net Profit",
        type: "number",
        placeholder: "50000",
      },
      {
        id: "totalAssets",
        label: "Total Assets",
        type: "number",
        placeholder: "300000",
      },
      {
        id: "totalDebts",
        label: "Total Debts",
        type: "number",
        placeholder: "100000",
      },
      {
        id: "requestedAmount",
        label: "Requested Amount",
        type: "number",
        placeholder: "50000",
      },
      {
        id: "useOfFunds",
        label: "Use of Funds",
        type: "text",
        placeholder: "Expansion, Marketing, etc.",
      },
    ],
    api: "/api/financingsimulator",
  },
};

const FormDetail = () => {
  const [selectedCalculator, setSelectedCalculator] = useState("breakeven");
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const handleCalculatorChange = (e) => {
    setSelectedCalculator(e.target.value);
    setFormData({});
    setResult(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const calculator = calculators[selectedCalculator];

    try {
      const response = await fetch(calculator.api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to calculate.");
    }
  };

  const currentCalculator = calculators[selectedCalculator];

  return (
    <div className="bg-white border rounded-md shadow-md p-7 border-t-4 border-t-hoverBtnColor">
      <div className="lg:flex block justify-center border border-desColor w-full">
        <div className="w-full lg:w-1/2 p-3 bg-lightCard">
          <form onSubmit={handleSubmit}>
            {/* Calculator Selection Dropdown */}
            <div>
              <label htmlFor="calculator" className="mb-3 text-headingColor">
                Select Calculator
              </label>
              <select
                id="calculator"
                value={selectedCalculator}
                onChange={handleCalculatorChange}
                className="bg-white border border-desColor text-headingColor outline-none rounded-md w-full p-3 mt-2 mb-3"
              >
                {Object.entries(calculators).map(([key, calc]) => (
                  <option key={key} value={key}>
                    {calc.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic Form Fields */}
            {currentCalculator.fields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="mb-3 text-headingColor">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  value={formData[field.id] || ""}
                  onChange={handleInputChange}
                  className="bg-white border border-desColor text-headingColor outline-none rounded-md w-full p-3 mt-2 mb-3"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            {/* Submit Button */}
            <button className="w-full text-lg text-white bg-btnColor hover:bg-hoverBtnColor duration-700 rounded-md p-3 lg:mt-0 mt-4">
              Calculate
            </button>
          </form>
        </div>

        {/* Result Section */}
        <div className="w-full lg:w-1/2 p-3 mt-4 lg:mt-0">
          {result ? (
            <>
              <p className="text-lg font-semibold text-gray-700 text-center mb-4">
                Calculation Result
              </p>
              <div className="space-y-4">
    {Object.entries(result).map(([key, value]) => (
      <div key={key}>
        <h3 className="text-lg font-medium text-gray-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
        <p className="text-gray-700">{value}</p>
      </div>
    ))}
  </div>

            </>
          ) : (
            <p className="text-gray-500 text-center">
              No result to display yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormDetail;
