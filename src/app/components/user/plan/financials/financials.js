"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Financials = () => {
  const router = useRouter();
  const [financialData, setFinancialData] = useState({
    productCosts: 0,
    revenue: 0,
    charges: 0,
    salaries: 0,
    cashFlow: 0,
    debtService: 0,
    marketPotentialIndex: 0,
  });
  const [token, setToken] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New state for loading status

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId && storedData.financials) {
      setFinancialData(
        storedData.financials[planId] || {
          productCosts: 0,
          revenue: 0,
          charges: 0,
          salaries: 0,
          cashFlow: 0,
          debtService: 0,
          marketPotentialIndex: 0,
        }
      );
    }

    const storedToken = localStorage.getItem("token");
    const storedPlanData = JSON.parse(localStorage.getItem("planData"));

    setToken(storedToken);
    setPlanData(storedPlanData);
  }, []);

  const saveFinancialsToLocalStorage = (newFinancials) => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId) {
      storedData.financials = storedData.financials || {};
      storedData.financials[planId] = newFinancials;

      localStorage.setItem("planData", JSON.stringify(storedData)); // Save the updated financials
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Set loading to true when the API starts

    const planId = localStorage.getItem("planId");

    // Save financial data to localStorage
    saveFinancialsToLocalStorage(financialData);

    // Include the financialData in planData
    const planDataWithFinancials = { ...planData, financials: financialData };

    // Make API request to update the plan with financials data
    const response = await fetch("/api/generatereport/update-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        planId,
        planData: planDataWithFinancials, // Include the financial data here
      }),
    });

    const data = await response.json();
    setIsLoading(false); // Set loading to false once the API call finishes

    if (response.ok) {
      // Handle success
      console.log("Financials updated successfully:", data);
      router.push("/user/report-download");
    } else {
      // Handle failure
      console.error("Error updating financials:", data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFinancialData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  return (
    <div className="p-4">
      <p className="text-2xl text-headingColor mb-4 font-bold">Financials</p>

      <div className="my-4">
        <label className="block text-sm mb-1">Product Costs</label>
        <input
          type="number"
          name="productCosts"
          value={financialData.productCosts}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
        />
      </div>

      <div className="my-4">
        <label className="block text-sm mb-1">Revenue</label>
        <input
          type="number"
          name="revenue"
          value={financialData.revenue}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
        />
      </div>

      <div className="my-4">
        <label className="block text-sm mb-1">Charges</label>
        <input
          type="number"
          name="charges"
          value={financialData.charges}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
        />
      </div>

      <div className="my-4">
        <label className="block text-sm mb-1">Salaries</label>
        <input
          type="number"
          name="salaries"
          value={financialData.salaries}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
        />
      </div>

      <div className="my-4">
        <label className="block text-sm mb-1">Cash Flow</label>
        <input
          type="number"
          name="cashFlow"
          value={financialData.cashFlow}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
        />
      </div>

      <div className="my-4">
        <label className="block text-sm mb-1">Debt Service</label>
        <input
          type="number"
          name="debtService"
          value={financialData.debtService}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
        />
      </div>

      <div className="my-4">
        <label className="block text-sm mb-1">Market Potential Index</label>
        <input
          type="number"
          name="marketPotentialIndex"
          value={financialData.marketPotentialIndex}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark"
        disabled={isLoading}
      >
        {isLoading ? "Please wait..." : "Submit"}{" "}
      </button>
    </div>
  );
};

export default Financials;
