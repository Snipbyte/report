"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Financials = () => {
  const router = useRouter();
  const [financialData, setFinancialData] = useState({
    Principal: 0,
    Interest: 0,
    revenue: {
      productLines: [
        {
          name: "",
          unitPrice: 0,
          volume: 0,
          annualGrowthRate: 0,
        },
      ],
      period: {
        startYear: 0,
        endYear: 0,
      },
    },
    expenses: {
      generalExpenses: { cost: 0, annualGrowthRate: 0, frequency: "" },
      lease: { cost: 0, annualGrowthRate: 0, frequency: "" },
      productCosts: { cost: 0, annualGrowthRate: 0, frequency: "" },
      financialCharges: { cost: 0, annualGrowthRate: 0, frequency: "" },
      salaries: { cost: 0, annualGrowthRate: 0, frequency: "" },
      variableCosts: { percentageOfRevenue: 0 },
      insurance: { cost: 0, annualGrowthRate: 0, frequency: "" },
      marketing: { cost: 0, annualGrowthRate: 0, frequency: "" },
      maintenance: { cost: 0, annualGrowthRate: 0, frequency: "" },
      utilities: { cost: 0, annualGrowthRate: 0, frequency: "" },
      professionalServices: { cost: 0, annualGrowthRate: 0, frequency: "" },
      training: { cost: 0, annualGrowthRate: 0, frequency: "" },
      itSoftwareSubscriptions: { cost: 0, annualGrowthRate: 0, frequency: "" },
      travel: { cost: 0, annualGrowthRate: 0, frequency: "" },
    },
    financialResults: {
      totalRevenue: 0,
      totalProductCosts: 0,
      grossMargin: 0,
      totalCharges: 0,
      addedValue: 0,
      totalSalaries: 0,
      EBITDA: 0,
      profitability: {
        isProfitable: false,
        EBITDAMargin: 0,
        debtCoverageRatio: 0,
      },
      scoring: {
        marketPotentialIndex: 0,
        recommendation: "",
      },
    },
  });

  const [token, setToken] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load planData from localStorage
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    setPlanData(storedData.planData || {}); // Ensure planData is available

    // Load financialData if it exists in stored planData
    if (
      storedData.planData &&
      storedData.planData.financialData &&
      storedData.planData.financialData.data
    ) {
      setFinancialData(storedData.planData.financialData.data); // Set the data correctly
    }

    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const saveFinancialsToLocalStorage = (newFinancials) => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};

    // If planData doesn't exist, initialize it
    storedData.planData = storedData.planData || {};

    // Ensure financialData is nested correctly
    storedData.planData.financialData = storedData.planData.financialData || {};
    storedData.planData.financialData.data = newFinancials;

    // Save everything back to localStorage
    localStorage.setItem("planData", JSON.stringify(storedData));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Save updated financial data to localStorage
    saveFinancialsToLocalStorage(financialData);

    const planId = localStorage.getItem("planId");

    // Ensure the correct structure for financialData when sending to the server
    const updatedPlanData = {
      ...planData,
      financialData: {
        ...planData.financialData,
        data: financialData, // financial data goes under the `data` field
      },
    };

    // Send the updated plan data to the server
    const response = await fetch("/api/generatereport/update-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        planId,
        planData: updatedPlanData,
      }),
    });

    const data = await response.json();
    setIsLoading(false);

    if (response.ok) {
      console.log("Financials updated successfully:", data);
      router.push("/user/report-download");
    } else {
      console.error("Error updating financials:", data.message);
    }
  };

  // Handle nested input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Helper to update nested object values
    const setNestedValue = (obj, path, value) => {
      const keys = path.split(".");
      let current = obj;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = isNaN(value) ? value : parseFloat(value);
        } else {
          current[key] = current[key] || {};
          current = current[key];
        }
      });
    };

    setFinancialData((prevData) => {
      const updatedData = { ...prevData };
      setNestedValue(updatedData, name, value); // Update the nested value
      return updatedData;
    });
  };

  return (
    <div className="p-4">
      <p className="text-2xl text-headingColor mb-4 font-bold">Financials</p>

      <div className="my-4">
        <label className="block text-sm mb-1">Principal</label>
        <input
          type="number"
          name="Principal"
          value={financialData?.Principal}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
        />
      </div>

      <div className="my-4">
        <label className="block text-sm mb-1">Interest</label>
        <input
          type="number"
          name="Interest"
          value={financialData?.Interest}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
        />
      </div>

      <div className="my-4">
        <label className="block text-sm mb-1">Start Year</label>
        <input
          type="number"
          name="revenue.period.startYear"
          value={financialData?.revenue?.period?.startYear || 0}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
        />
      </div>

      <div className="my-4">
        <label className="block text-sm mb-1">End Year</label>
        <input
          type="number"
          name="revenue.period.endYear"
          value={financialData?.revenue?.period?.endYear || 0}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
        />
      </div>

      {/* Add similar sections for `expenses`, `financialResults`, and their nested fields */}

      {/* expenses  */}
      <div className="p-4">
        <p className="text-2xl text-headingColor mb-4 font-bold">Expenses</p>

        <div className="my-4">
          <label className="block text-sm mb-1">General Expenses Cost</label>
          <input
            type="number"
            name="expenses.generalExpenses.cost"
            value={financialData?.expenses?.generalExpenses?.cost || 0}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            General Expenses Annual Growth Rate
          </label>
          <input
            type="number"
            name="expenses.generalExpenses.annualGrowthRate"
            value={financialData?.expenses?.generalExpenses?.annualGrowthRate}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            General Expenses Frequency
          </label>
          <input
            type="text"
            name="expenses.generalExpenses.frequency"
            value={financialData?.expenses?.generalExpenses?.frequency}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>

        <div className="my-4">
          <label className="block text-sm mb-1">Lease Cost</label>
          <input
            type="number"
            name="expenses.lease.cost"
            value={financialData?.expenses?.lease?.cost}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">Lease Annual Growth Rate</label>
          <input
            type="number"
            name="expenses.lease.annualGrowthRate"
            value={financialData?.expenses?.lease?.annualGrowthRate}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">Lease Frequency</label>
          <input
            type="text"
            name="expenses.lease.frequency"
            value={financialData?.expenses?.lease?.frequency}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>

        <div className="my-4">
          <label className="block text-sm mb-1">Product Costs</label>
          <input
            type="number"
            name="expenses.productCosts.cost"
            value={financialData?.expenses?.productCosts?.cost}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            Product Costs Annual Growth Rate
          </label>
          <input
            type="number"
            name="expenses.productCosts.annualGrowthRate"
            value={financialData?.expenses?.productCosts?.annualGrowthRate}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">Product Costs Frequency</label>
          <input
            type="text"
            name="expenses.productCosts.frequency"
            value={financialData?.expenses?.productCosts?.frequency}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>

        <div className="my-4">
          <label className="block text-sm mb-1">
            Variable Costs Percentage of Revenue
          </label>
          <input
            type="number"
            name="expenses.variableCosts.percentageOfRevenue"
            value={financialData?.expenses?.variableCosts?.percentageOfRevenue}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>

        <div className="my-4">
          <label className="block text-sm mb-1">Financial Charges Cost</label>
          <input
            type="number"
            name="expenses.financialCharges.cost"
            value={financialData?.expenses?.financialCharges?.cost}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            Financial Charges Annual Growth Rate
          </label>
          <input
            type="number"
            name="expenses.financialCharges.annualGrowthRate"
            value={financialData?.expenses?.financialCharges?.annualGrowthRate}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            Financial Charges Frequency
          </label>
          <input
            type="text"
            name="expenses.financialCharges.frequency"
            value={financialData?.expenses?.financialCharges?.frequency}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>

        <div className="my-4">
          <label className="block text-sm mb-1">Salaries Cost</label>
          <input
            type="number"
            name="expenses.salaries.cost"
            value={financialData?.expenses?.salaries?.cost}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            Salaries Annual Growth Rate
          </label>
          <input
            type="number"
            name="expenses.salaries.annualGrowthRate"
            value={financialData?.expenses?.salaries?.annualGrowthRate}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">Salaries Frequency</label>
          <input
            type="text"
            name="expenses.salaries.frequency"
            value={financialData?.expenses?.salaries?.frequency}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>

        <div className="my-4">
          <label className="block text-sm mb-1">Insurance Cost</label>
          <input
            type="number"
            name="expenses.insurance.cost"
            value={financialData?.expenses?.insurance?.cost}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            Insurance Annual Growth Rate
          </label>
          <input
            type="number"
            name="expenses.insurance.annualGrowthRate"
            value={financialData?.expenses?.insurance?.annualGrowthRate}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">Insurance Frequency</label>
          <input
            type="text"
            name="expenses.insurance.frequency"
            value={financialData?.expenses?.insurance?.frequency}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>

        <div className="my-4">
          <label className="block text-sm mb-1">Marketing Cost</label>
          <input
            type="number"
            name="expenses.marketing.cost"
            value={financialData?.expenses?.marketing?.cost}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            Marketing Annual Growth Rate
          </label>
          <input
            type="number"
            name="expenses.marketing.annualGrowthRate"
            value={financialData?.expenses?.marketing?.annualGrowthRate}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">Marketing Frequency</label>
          <input
            type="text"
            name="expenses.marketing.frequency"
            value={financialData?.expenses?.marketing?.frequency}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>

        <div className="my-4">
          <label className="block text-sm mb-1">Maintenance</label>
          <input
            type="number"
            name="expenses.maintenance.cost"
            value={financialData?.expenses?.maintenance?.cost}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            Maintenance Annual Growth Rate
          </label>
          <input
            type="number"
            name="expenses.maintenance.annualGrowthRate"
            value={financialData?.expenses?.maintenance?.annualGrowthRate}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">maintenance Frequency</label>
          <input
            type="text"
            name="expenses.maintenance.frequency"
            value={financialData?.expenses?.maintenance?.frequency}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>

        {/* utilities  */}
        <div className="my-4">
          <label className="block text-sm mb-1">Utilities</label>
          <input
            type="number"
            name="expenses.utilities.cost"
            value={financialData?.expenses?.utilities?.cost}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            Utilities Annual Growth Rate
          </label>
          <input
            type="number"
            name="expenses.utilities.annualGrowthRate"
            value={financialData?.expenses?.utilities?.annualGrowthRate}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">Utilities Frequency</label>
          <input
            type="text"
            name="expenses.utilities.frequency"
            value={financialData?.expenses?.utilities?.frequency}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>

        {/* Professional Services  */}
        <div className="my-4">
          <label className="block text-sm mb-1">
            Professional Services Cost{" "}
          </label>
          <input
            type="number"
            name="expenses.professionalServices.cost"
            value={financialData?.expenses?.professionalServices?.cost}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            professionalServices Annual Growth Rate
          </label>
          <input
            type="number"
            name="expenses.professionalServices.annualGrowthRate"
            value={financialData?.expenses?.professionalServices?.annualGrowthRate}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            professionalServices Frequency
          </label>
          <input
            type="text"
            name="expenses.professionalServices.frequency"
            value={financialData?.expenses?.professionalServices?.frequency}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>

        {/* Training  */}
        <div className="my-4">
          <label className="block text-sm mb-1">Training Cost </label>
          <input
            type="number"
            name="expenses.training.cost"
            value={financialData?.expenses?.training?.cost}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            training Annual Growth Rate
          </label>
          <input
            type="number"
            name="expenses.training.annualGrowthRate"
            value={financialData?.expenses?.training?.annualGrowthRate}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">training Frequency</label>
          <input
            type="text"
            name="expenses.training.frequency"
            value={financialData?.expenses?.training?.frequency}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        {/* itSoftwareSubscriptions  */}
        <div className="my-4">
          <label className="block text-sm mb-1">
            itSoftwareSubscriptions Cost{" "}
          </label>
          <input
            type="number"
            name="expenses.itSoftwareSubscriptions.cost"
            value={financialData?.expenses?.itSoftwareSubscriptions?.cost}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            itSoftwareSubscriptions Annual Growth Rate
          </label>
          <input
            type="number"
            name="expenses.itSoftwareSubscriptions.annualGrowthRate"
            value={
              financialData?.expenses?.itSoftwareSubscriptions?.annualGrowthRate
            }
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            itSoftwareSubscriptions Frequency
          </label>
          <input
            type="text"
            name="expenses.itSoftwareSubscriptions.frequency"
            value={financialData?.expenses?.itSoftwareSubscriptions?.frequency}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>

        {/* travel  */}
        <div className="my-4">
          <label className="block text-sm mb-1">travel Cost </label>
          <input
            type="number"
            name="expenses.travel.cost"
            value={financialData?.expenses?.travel?.cost}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">
            travel Annual Growth Rate
          </label>
          <input
            type="number"
            name="expenses.travel.annualGrowthRate"
            value={financialData?.expenses?.travel?.annualGrowthRate}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">travel Frequency</label>
          <input
            type="text"
            name="expenses.travel.frequency"
            value={financialData?.expenses?.travel?.frequency}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>

        {/* <div className="p-4">
          <p className="text-2xl text-headingColor mb-4 font-bold">
            Financial Results
          </p>

          <div className="my-4">
            <label className="block text-sm mb-1">Total Revenue</label>
            <input
              type="number"
              name="financialResults.totalRevenue"
              value={financialData?.financialResults?.totalRevenue}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>

          <div className="my-4">
            <label className="block text-sm mb-1">Total Product Costs</label>
            <input
              type="number"
              name="financialResults.totalProductCosts"
              value={financialData?.financialResults?.totalProductCosts}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>

          <div className="my-4">
            <label className="block text-sm mb-1">Gross Margin</label>
            <input
              type="number"
              name="financialResults.grossMargin"
              value={financialData.financialResults.grossMargin}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>

          <div className="my-4">
            <label className="block text-sm mb-1">Total Charges</label>
            <input
              type="number"
              name="financialResults.totalCharges"
              value={financialData.financialResults.totalCharges}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>

          <div className="my-4">
            <label className="block text-sm mb-1">Added Value</label>
            <input
              type="number"
              name="financialResults.addedValue"
              value={financialData.financialResults.addedValue}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>

          <div className="my-4">
            <label className="block text-sm mb-1">Total Salaries</label>
            <input
              type="number"
              name="financialResults.totalSalaries"
              value={financialData.financialResults.totalSalaries}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>

          <div className="my-4">
            <label className="block text-sm mb-1">EBITDA</label>
            <input
              type="number"
              name="financialResults.EBITDA"
              value={financialData.financialResults.EBITDA}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>

          <p className="text-xl text-headingColor mb-4 font-bold">
            Profitability
          </p>

          <div className="my-4">
            <label className="block text-sm mb-1">Is Profitable</label>
            <select
              name="financialResults.profitability.isProfitable"
              value={financialData.financialResults.profitability.isProfitable}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="my-4">
            <label className="block text-sm mb-1">EBITDA Margin</label>
            <input
              type="number"
              name="financialResults.profitability.EBITDAMargin"
              value={financialData.financialResults.profitability.EBITDAMargin}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>

          <div className="my-4">
            <label className="block text-sm mb-1">Debt Coverage Ratio</label>
            <input
              type="number"
              name="financialResults.profitability.debtCoverageRatio"
              value={
                financialData.financialResults.profitability.debtCoverageRatio
              }
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>

          <p className="text-xl text-headingColor mb-4 font-bold">Scoring</p>

          <div className="my-4">
            <label className="block text-sm mb-1">Market Potential Index</label>
            <input
              type="number"
              name="financialResults.scoring.marketPotentialIndex"
              value={
                financialData.financialResults.scoring.marketPotentialIndex
              }
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>

          <div className="my-4">
            <label className="block text-sm mb-1">Recommendation</label>
            <input
              type="text"
              name="financialResults.scoring.recommendation"
              value={financialData.financialResults.scoring.recommendation}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>
        </div> */}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark"
        disabled={isLoading}
      >
        {isLoading ? "Please wait..." : "Submit"}
      </button>
    </div>
  );
};

export default Financials;
