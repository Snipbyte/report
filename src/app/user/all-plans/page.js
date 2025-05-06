"use client";
import UserLayout from "@/app/components/layouts/userLayout/page";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AllPlans = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const defaultRows = 3; // Number of rows to show by default

  // Fetch All Plans
  const fetchAllPlans = async () => {
    try {
      const response = await fetch(`/api/user/all-plans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });
      const data = await response.json();
      if (data.message === "Plans retrieved successfully") {
        setPlans(data.plans);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPlans();
  }, []);
  const handleViewPlan = (planId) => {
    localStorage.setItem("planId", planId);
    router.push("/user/report-download");
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        {t("allPlans.loading")}
      </div>
    );
  }

  const displayedPlans = showAll ? plans : plans.slice(0, defaultRows);

  return (
    <UserLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-headingColor mb-6 animate-fadeIn">
          {t("allPlans.title")}
        </h1>
        {plans.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
                    <th className="py-4 px-6 text-left text-sm font-semibold text-headingColor">
                      {t("allPlans.projectName")}
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-headingColor">
                      {t("allPlans.typeOfActivity")}
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-headingColor">
                      {t("allPlans.address")}
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-headingColor">
                      {t("allPlans.launchDate")}
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-headingColor">
                      {t("allPlans.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedPlans.map((plan, index) => (
                    <tr
                      key={plan._id}
                      className="border-b hover:bg-gray-50 transition-all duration-300 animate-slideIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="py-4 px-6 text-headingColor">{plan.projectName}</td>
                      <td className="py-4 px-6 text-headingColor">{plan.typeOfActivity}</td>
                      <td className="py-4 px-6 text-headingColor">{plan.address}</td>
                      <td className="py-4 px-6 text-headingColor">
                        {plan.launchDate
                          ? new Date(plan.launchDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleViewPlan(plan._id)}
                          className="bg-btnColor text-white font-semibold py-1 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-sm hover:shadow-md"
                          aria-label={`${t("allPlans.viewPlan")} ${plan.projectName}`}
                        >
                          {t("allPlans.viewPlan")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {plans.length > defaultRows && (
              <div className="p-4 text-center">
                <button
                  onClick={toggleShowAll}
                  className="bg-btnColor text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-sm hover:shadow-md"
                  aria-label={showAll ? t("showLess") : t("showMore")}
                >
                  {showAll ? t("showLess") : t("showMore")}
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-600">{t("noBusinessPlansFound")}</p>
        )}
      </div>
    </UserLayout>
  );
};

export default AllPlans;