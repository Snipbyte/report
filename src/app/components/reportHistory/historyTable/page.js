"use client";
import React, { useState } from "react";

const HistoryTable = ({ businessPlans }) => {
  const [expandedPlan, setExpandedPlan] = useState(null); 
  const handleToggleDetails = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-lightCard text-headingColor text-sm uppercase">
            <th className="text-left py-3 px-4">Company Name</th>
            <th className="text-left py-3 px-4">Industry Sector</th>
            <th className="text-left py-3 px-4">Date of Establishment</th>
            <th className="text-left py-3 px-4">Location</th>
            <th className="text-left py-3 px-4">Actions</th>
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
                      className="text-blue-500 hover:underline"
                      onClick={() => handleToggleDetails(plan._id)}
                    >
                      {expandedPlan === plan._id
                        ? "Hide Details"
                        : "View Details"}
                    </button>
                  </td>
                </tr>
                {expandedPlan === plan._id && (
                  <tr className="bg-gray-100">
                    <td colSpan="5" className="py-3 px-4">
                      {/* Render additional details of the plan here */}
                      <div>
                        <h3 className="font-bold">Financial Projections:</h3>
                        <p>
                          Annual Revenues:{" "}
                          {plan.financialProjections.annualRevenues.join(", ")}
                        </p>
                        <p>
                          Annual Expenses:{" "}
                          {plan.financialProjections.annualExpenses.join(", ")}
                        </p>
                        <p>
                          Net Income:{" "}
                          {plan.financialProjections.netIncome.join(", ")}
                        </p>
                        <p>
                          Initial Investments:{" "}
                          {plan.investmentsAndFinancing.initialInvestments}
                        </p>
                        {/* Add any other details you'd like to show */}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-3 px-4 text-center">
                No business plans available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
