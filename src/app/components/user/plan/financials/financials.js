"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const Financials = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const initialFinancialData = {
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
      generalExpenses: { cost: 0, annualGrowthRate: 0, frequency: "monthly" },
      lease: { cost: 0, annualGrowthRate: 0, frequency: "monthly" },
      productCosts: { cost: 0, annualGrowthRate: 0, frequency: "monthly" },
      financialCharges: { cost: 0, annualGrowthRate: 0, frequency: "monthly" },
      salaries: { cost: 0, annualGrowthRate: 0, frequency: "monthly" },
      variableCosts: { percentageOfRevenue: 0 },
      insurance: { cost: 0, annualGrowthRate: 0, frequency: "monthly" },
      marketing: { cost: 0, annualGrowthRate: 0, frequency: "monthly" },
      maintenance: { cost: 0, annualGrowthRate: 0, frequency: "monthly" },
      utilities: { cost: 0, annualGrowthRate: 0, frequency: "monthly" },
      professionalServices: { cost: 0, annualGrowthRate: 0, frequency: "monthly" },
      training: { cost: 0, annualGrowthRate: 0, frequency: "monthly" },
      itSoftwareSubscriptions: { cost: 0, annualGrowthRate: 0, frequency: "monthly" },
      travel: { cost: 0, annualGrowthRate: 0, frequency: "monthly" },
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
  };

  const [financialData, setFinancialData] = useState(initialFinancialData);
  const [token, setToken] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    setPlanData(storedData.planData || {});
    if (
      storedData.planData &&
      storedData.planData.financialData &&
      storedData.planData.financialData.data
    ) {
      setFinancialData((prevData) => ({
        ...prevData,
        ...storedData.planData.financialData.data,
        revenue: {
          ...prevData.revenue,
          ...(storedData.planData.financialData.data.revenue || {}),
          productLines:
            storedData.planData.financialData.data.revenue?.productLines ||
            prevData.revenue.productLines,
          period:
            storedData.planData.financialData.data.revenue?.period ||
            prevData.revenue.period,
        },
        expenses: {
          ...prevData.expenses,
          ...(storedData.planData.financialData.data.expenses || {}),
        },
        financialResults: {
          ...prevData.financialResults,
          ...(storedData.planData.financialData.data.financialResults || {}),
          profitability: {
            ...prevData.financialResults.profitability,
            ...(storedData.planData.financialData.data.financialResults?.profitability || {}),
          },
          scoring: {
            ...prevData.financialResults.scoring,
            ...(storedData.planData.financialData.data.financialResults?.scoring || {}),
          },
        },
      }));
    }
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const saveFinancialsToLocalStorage = (newFinancials) => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    storedData.planData = storedData.planData || {};
    storedData.planData.financialData = storedData.planData.financialData || {};
    storedData.planData.financialData.data = newFinancials;
    localStorage.setItem("planData", JSON.stringify(storedData));
  };

  const addProductLine = () => {
    setFinancialData((prevData) => ({
      ...prevData,
      revenue: {
        ...prevData.revenue,
        productLines: [
          ...(prevData.revenue?.productLines || []),
          {
            name: "",
            unitPrice: 0,
            volume: 0,
            annualGrowthRate: 0,
          },
        ],
      },
    }));
  };

  const removeProductLine = (index) => {
    setFinancialData((prevData) => ({
      ...prevData,
      revenue: {
        ...prevData.revenue,
        productLines: (prevData.revenue?.productLines || []).filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleProductLineChange = (index, field, value) => {
    setFinancialData((prevData) => {
      const updatedProductLines = [...(prevData.revenue?.productLines || [])];
      updatedProductLines[index] = {
        ...updatedProductLines[index],
        [field]: isNaN(value) ? value : parseFloat(value),
      };
      return {
        ...prevData,
        revenue: {
          ...prevData.revenue,
          productLines: updatedProductLines,
        },
      };
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    saveFinancialsToLocalStorage(financialData);
    const planId = localStorage.getItem("planId");
    const updatedPlanData = {
      ...planData,
      financialData: {
        ...planData.financialData,
        data: financialData,
      },
    };

    console.log(
      "Payload sent to backend:",
      JSON.stringify({ planId, planData: updatedPlanData }, null, 2)
    );

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
      setNestedValue(updatedData, name, value);
      return updatedData;
    });
  };

  const renderExpenseFields = (category, labelKey) => (
    <div className="my-4">
      <label className="block text-sm mb-1">{t(`financials.expenses.${labelKey}.costLabel`)} (€)</label>
      <input
        type="number"
        name={`expenses.${category}.cost`}
        value={financialData.expenses[category]?.cost || 0}
        onChange={handleInputChange}
        className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
      />
      <label className="block text-sm mb-1 mt-2">
        {t(`financials.expenses.${labelKey}.growthRateLabel`)} (%)
      </label>
      <input
        type="number"
        name={`expenses.${category}.annualGrowthRate`}
        value={financialData.expenses[category]?.annualGrowthRate || 0}
        onChange={handleInputChange}
        className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
      />
      <label className="block text-sm mb-1 mt-2">{t(`financials.expenses.${labelKey}.frequencyLabel`)}</label>
      <select
        name={`expenses.${category}.frequency`}
        value={financialData.expenses[category]?.frequency || "monthly"}
        onChange={handleInputChange}
        className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
      >
        <option value="monthly">{t("financials.frequencies.monthly")}</option>
        <option value="yearly">{t("financials.frequencies.yearly")}</option>
      </select>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl text-headingColor mb-6 font-bold">{t("financials.title")}</h1>
      <div className="my-4">
        <label className="block text-sm mb-1">{t("financials.principalLabel")} (€)</label>
        <input
          type="number"
          name="Principal"
          value={financialData?.Principal || 0}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
        />
      </div>
      <div className="my-4">
        <label className="block text-sm mb-1">{t("financials.interestLabel")} (€)</label>
        <input
          type="number"
          name="Interest"
          value={financialData?.Interest || 0}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
        />
      </div>
      <div className="my-4">
        <h2 className="text-xl text-headingColor mb-2 font-bold">{t("financials.revenuePeriodTitle")}</h2>
        <div className="my-4">
          <label className="block text-sm mb-1">{t("financials.startYearLabel")}</label>
          <input
            type="number"
            name="revenue.period.startYear"
            value={financialData?.revenue?.period?.startYear || 0}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm mb-1">{t("financials.endYearLabel")}</label>
          <input
            type="number"
            name="revenue.period.endYear"
            value={financialData?.revenue?.period?.endYear || 0}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
      </div>
      <div className="my-4">
        <h2 className="text-xl text-headingColor mb-2 font-bold">{t("financials.productLinesTitle")}</h2>
        {(financialData.revenue?.productLines || []).map((product, index) => (
          <div key={index} className="border p-4 mb-4 rounded-md">
            <div className="my-2">
              <label className="block text-sm mb-1">{t("financials.productNameLabel")}</label>
              <input
                type="text"
                value={product.name || ""}
                onChange={(e) =>
                  handleProductLineChange(index, "name", e.target.value)
                }
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
              />
            </div>
            <div className="my-2">
              <label className="block text-sm mb-1">{t("financials.unitPriceLabel")} (€)</label>
              <input
                type="number"
                value={product.unitPrice || 0}
                onChange={(e) =>
                  handleProductLineChange(index, "unitPrice", e.target.value)
                }
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
              />
            </div>
            <div className="my-2">
              <label className="block text-sm mb-1">{t("financials.volumeLabel")} ({t("financials.units")})</label>
              <input
                type="number"
                value={product.volume || 0}
                onChange={(e) =>
                  handleProductLineChange(index, "volume", e.target.value)
                }
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
              />
            </div>
            <div className="my-2">
              <label className="block text-sm mb-1">{t("financials.annualGrowthRateLabel")} (%)</label>
              <input
                type="number"
                value={product.annualGrowthRate || 0}
                onChange={(e) =>
                  handleProductLineChange(index, "annualGrowthRate", e.target.value)
                }
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
              />
            </div>
            <button
              onClick={() => removeProductLine(index)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              {t("financials.removeButton")}
            </button>
          </div>
        ))}
        <button
          onClick={addProductLine}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {t("financials.addProductLineButton")}
        </button>
      </div>
      <div className="my-4">
        <h2 className="text-xl text-headingColor mb-2 font-bold">{t("financials.expensesTitle")}</h2>
        {renderExpenseFields("generalExpenses", "generalExpenses")}
        {renderExpenseFields("lease", "lease")}
        {renderExpenseFields("productCosts", "productCosts")}
        {renderExpenseFields("financialCharges", "financialCharges")}
        {renderExpenseFields("salaries", "salaries")}
        <div className="my-4">
          <label className="block text-sm mb-1">{t("financials.expenses.variableCosts.percentageLabel")} (%)</label>
          <input
            type="number"
            name="expenses.variableCosts.percentageOfRevenue"
            value={
              financialData?.expenses?.variableCosts?.percentageOfRevenue || 0
            }
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
          />
        </div>
        {renderExpenseFields("insurance", "insurance")}
        {renderExpenseFields("marketing", "marketing")}
        {renderExpenseFields("maintenance", "maintenance")}
        {renderExpenseFields("utilities", "utilities")}
        {renderExpenseFields("professionalServices", "professionalServices")}
        {renderExpenseFields("training", "training")}
        {renderExpenseFields("itSoftwareSubscriptions", "itSoftwareSubscriptions")}
        {renderExpenseFields("travel", "travel")}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-btnColor text-white rounded hover:bg-btnColor-dark"
        disabled={isLoading}
      >
        {isLoading ? t("financials.loadingButton") : t("financials.submitButton")}
      </button>
    </div>
  );
};

export default Financials;