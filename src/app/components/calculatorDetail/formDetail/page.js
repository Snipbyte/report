"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const calculators = {
  breakeven: {
    label: "breakeven",
    fields: [
      { id: "fixedCosts", label: "fixed", type: "number", placeholder: "1000" },
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
    label: "businessValuation",
    fields: [
      { id: "netProfit", label: "netProfit", type: "number", placeholder: "50000" },
      { id: "growthRate", label: "growthRate", type: "number", placeholder: "5" },
      { id: "discountRate", label: "discountRate", type: "number", placeholder: "10" },
    ],
    api: "/api/businessvaluation",
  },
  cashflow: {
    label: "cashflow",
    fields: [
      { id: "month", label: "Month", type: "text", placeholder: "January" },
      {
        id: "cashInflows",
        label: "cashInflows",
        type: "number",
        placeholder: "10000",
      },
      {
        id: "cashOutflows",
        label: "cashOutflows",
        type: "number",
        placeholder: "5000",
      },
      {
        id: "initialCashBalance",
        label: "initialCashBalance",
        type: "number",
        placeholder: "5000",
      },
    ],
    api: "/api/cashflow",
  },
  // financialForecast: {
  //   label: "financialForecast",
  //   fields: [
  //     { id: "revenues", label: "revenues", type: "number", placeholder: "20000" },
  //     { id: "fixedExpenses", label: "fixedExpenses", type: "number", placeholder: "8000" },
  //     { id: "variableExpenses", label: "variableExpenses", type: "number", placeholder: "5000" },
  //   ],
  //   api: "/api/financialforecast",
  // },
  grossmargin: {
    label: "grossmargin",
    fields: [
      { id: "product", label: "product", type: "text", placeholder: "Product Name" },
      { id: "sellingPrice", label: "sellingPrice", type: "number", placeholder: "15" },
      { id: "productionCost", label: "productionCost", type: "number", placeholder: "10" },
    ],
    api: "/api/grossmargin",
  },
  roi: {
    label: "roi",
    fields: [
      { id: "initialCost", label: "initialCost", type: "number", placeholder: "5000" },
      { id: "netGains", label: "netGains", type: "number", placeholder: "2000" },
    ],
    api: "/api/roi",
  },
  investment: {
    label: "investment",
    fields: [
      { id: "monthlyIncome", label: "monthlyIncome", type: "number", placeholder: "3000" },
      { id: "monthlyExpenses", label: "monthlyExpenses", type: "number", placeholder: "1500" },
      { id: "emergencySavings", label: "emergencySavings", type: "number", placeholder: "5000" },
      { id: "regularContributions", label: "regularContributions", type: "number", placeholder: "500" },
    ],
    api: "/api/investmentcapacity",
  },
  financingSimulation: {
    label: "financingSimulation",
    fields: [
      { id: "currentRevenue", label: "currentRevenue", type: "number", placeholder: "20000" },
      { id: "netProfit", label: "netProfit", type: "number", placeholder: "15000" },
      { id: "totalAssets", label: "totalAssets", type: "number", placeholder: "100000" },
      { id: "totalDebts", label: "totalDebts", type: "number", placeholder: "50000" },
      { id: "requestedAmount", label: "requestedAmount", type: "number", placeholder: "20000" },
      { id: "useOfFunds", label: "useOfFunds", type: "text", placeholder: "Expansion" },
    ],
    api: "/api/financingsimulator",
  },
};

const FormDetail = () => {
  const { t } = useTranslation();

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

    // Validate if all fields have values
    const missingFields = calculator.fields.filter(field => !formData[field.id]);

    if (missingFields.length > 0) {
      alert(`Error: Please fill in all required fields (${missingFields.map(f => f.label).join(', ')})`);
      return;
    }

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
              <h2 className="text-xl font-bold">
                {t(calculators[selectedCalculator].label)}
              </h2>

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
                  {t(field.label)}:
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  value={formData[field.id] || ""}
                  onChange={handleInputChange}
                  className="bg-white border border-desColor text-headingColor outline-none rounded-md w-full p-3 mt-2 mb-3"
                  placeholder={t(field.placeholder)}
                />
              </div>
            ))}

            {/* Submit Button */}
            <button className="w-full text-lg text-white bg-btnColor hover:bg-hoverBtnColor duration-700 rounded-md p-3 lg:mt-0 mt-4">
              {t("calculate")}
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
                    <h3 className="text-lg font-medium text-gray-800 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </h3>
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
