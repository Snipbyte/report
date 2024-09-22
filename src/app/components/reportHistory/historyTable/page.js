"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation

const HistoryTable = ({ businessPlans }) => {
  const { t } = useTranslation(); // Get translation function
  const [expandedPlan, setExpandedPlan] = useState(null);
  
  const handleToggleDetails = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-lightCard text-headingColor text-sm uppercase">
            <th className="text-left py-3 px-4">{t("companyName")}</th>
            <th className="text-left py-3 px-4">{t("industrySector")}</th>
            <th className="text-left py-3 px-4">{t("dateOfEstablishment")}</th>
            <th className="text-left py-3 px-4">{t("location")}</th>
            <th className="text-left py-3 px-4">{t("actions")}</th>
          </tr>
        </thead>
        <tbody className="text-paraColor text-sm">
          {businessPlans && businessPlans.length > 0 ? (
            businessPlans.map((plan) => (
              <React.Fragment key={plan._id}>
                <tr className="border-b">
                  <td className="py-3 px-4">{plan.companyName}</td>
                  <td className="py-3 px-4">{plan.industrySector}</td>
                  <td className="py-3 px-4">
                    {new Date(plan.dateOfEstablishment).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{plan.location}</td>
                  <td className="py-3 px-4">
                    <button
                      className="text-blue-500"
                      onClick={() => handleToggleDetails(plan._id)}
                    >
                      {expandedPlan === plan._id ? t("hideDetails") : t("viewDetails")}
                    </button>
                  </td>
                </tr>
                {expandedPlan === plan._id && (
                  <tr>
                    <td colSpan="5" className="p-4">
                      <div>
                        <p>{t("financialProjections")}</p>
                        <p>
                          {t("annualRevenues")}:{" "}
                          {plan.financialProjections.annualRevenues.length > 0
                            ? plan.financialProjections.annualRevenues.join(", ")
                            : t("noData")}
                        </p>
                        <p>
                          {t("annualExpenses")}:{" "}
                          {plan.financialProjections.annualExpenses.length > 0
                            ? plan.financialProjections.annualExpenses.join(", ")
                            : t("noData")}
                        </p>
                        <p>
                          {t("netIncome")}:{" "}
                          {plan.financialProjections.netIncome.length > 0
                            ? plan.financialProjections.netIncome.join(", ")
                            : t("noData")}
                        </p>
                        <p>
                          {t("initialInvestments")}: {plan.investmentsAndFinancing.initialInvestments}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-3 px-4 text-center">
                {t("noBusinessPlans")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
