"use client";

import LineChart from "@/app/components/common/Charts/lineChart/page";
import UserLayout from "@/app/components/layouts/userLayout/page";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";
import { TbUserHexagon } from "react-icons/tb";

const Dashboard = () => {
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [businessPlans, setBusinessPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch User Details by Token
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`/api/user/getUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
      });
      const data = await response.json();
      if (data.message === "User retrieved successfully") {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Fetch User Plans
  const fetchUserPlans = async () => {
    try {
      const response = await fetch(`/api/getUserPlans`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
      });
      const data = await response.json();
      if (data.message === "Business plans retrieved successfully") {
        setBusinessPlans(data.businessPlans);
      }
    } catch (error) {
      console.error("Error fetching user plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserPlans();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {t("loading")}
      </div>
    ); // Show loading state
  }

  // Prepare data for the line chart based on business plans
  const chartData = businessPlans.map((plan) => ({
    date: new Date(plan.dateOfEstablishment).getTime(), // Convert date to timestamp
    sales: plan.financialRatios.profitabilityRatio || 0, // Example: Using profitability ratio as sales data
  }));

  // Sort data by date for the line chart
  chartData.sort((a, b) => a.date - b.date);

  const chartSeries = [
    {
      name: t("sales"),
      data: chartData.map((item) => item.sales),
    },
  ];

  const chartCategories = chartData.map((item) => item.date); // Ensure dates are in milliseconds for the x-axis

  return (
    <UserLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {t("dashboard")}
        </h1>

        {/* User Information */}
        {user && (
          <div className="bg-white p-6 rounded-xl border mb-6 transition-all duration-300 hover:shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-btnColor">
                <TbUserHexagon className="w-6 h-6" />
              </span>
              {t("userInformation")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-paraColor">{t("firstName")}</p>
                <p className="mt-1 text-lg text-headingColor">{user.firstname}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-paraColor">{t("lastName")}</p>
                <p className="mt-1 text-lg text-headingColor">{user.lastname}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-paraColor">{t("E-mail")}</p>
                <p className="mt-1 text-lg text-headingColor">{user.email}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-paraColor">{t("currentPlan")}</p>
                <p className="mt-1 text-lg text-headingColor">
                  {user.currentPlan || t("none")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Line Chart */}
        <h2 className="text-2xl font-semibold text-headingColor mb-4">
          {t("businessPlanTrends")}
        </h2>
        <div className="bg-white rounded-xl border transition-all duration-300 hover:shadow-md p-4 mb-6">
          <LineChart series={chartSeries} categories={chartCategories} />
        </div>

        {/* User Business Plans */}
        <h2 className="text-2xl font-semibold text-headingColor mb-4">
          {t("businessPlans")}
        </h2>
        {businessPlans.length > 0 ? (
          <div className="space-y-4">
            {businessPlans.length > 0 ? (
              <div className="space-y-4">
                {businessPlans.slice(-2).map((plan) => (
                  <div
                    key={plan._id}
                    className="bg-white p-4 border rounded-xl shadow transition-all duration-300 hover:shadow-md"
                  >
                    <h3 className="font-bold text-lg">{plan.companyName}</h3>
                    <p className="mt-2">
                      <strong>{t("industrySector")}:</strong>{" "}
                      {plan.industrySector}
                    </p>
                    <p>
                      <strong>{t("location")}:</strong> {plan.location}
                    </p>
                    <p>
                      <strong>{t("dateOfEstablishment")}:</strong>{" "}
                      {new Date(plan.dateOfEstablishment).toLocaleDateString()}
                    </p>
                    <h4 className="font-semibold mt-2">
                      {t("financialRatios")}
                    </h4>
                    <p>
                      <strong>{t("liquidityRatio")}:</strong>{" "}
                      {plan.financialRatios.liquidityRatio}
                    </p>
                    <p>
                      <strong>{t("profitabilityRatio")}:</strong>{" "}
                      {plan.financialRatios.profitabilityRatio}
                    </p>
                    <p>
                      <strong>{t("debtRatio")}:</strong>{" "}
                      {plan.financialRatios.debtRatio}
                    </p>
                    <p>
                      <strong>{t("creditworthinessScore")}:</strong>{" "}
                      {plan.companyRating.creditworthinessScore}
                    </p>
                    <p>
                      <strong>{t("riskAssessmentScore")}:</strong>{" "}
                      {plan.companyRating.riskAssessmentScore}
                    </p>
                    <p>
                      <strong>{t("growthPotentialScore")}:</strong>{" "}
                      {plan.companyRating.growthPotentialScore}
                    </p>
                  </div>
                ))}
                {/* Button to view all business plans */}
                <div className="flex justify-center">
                  <Link
                    href="/user/report-history"
                    className="mt-4 bg-btnColor text-white font-semibold py-2 px-4 rounded shadow hover:bg-hoverBtnColor transition duration-300"
                  >
                    {t("viewAll")}
                  </Link>
                </div>
              </div>
            ) : (
              <p>{t("noBusinessPlansFound")}</p>
            )}
          </div>
        ) : (
          <p>{t("noBusinessPlansFound")}</p>
        )}
      </div>
    </UserLayout>
  );
};

export default Dashboard;
