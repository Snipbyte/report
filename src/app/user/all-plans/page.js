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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {t("loading")}
      </div>
    );
  }

  return (
    <UserLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {t("allBusinessPlans")}
        </h1>
        {plans.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-xl shadow">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    {t("projectName")}
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    {t("typeOfActivity")}
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    {t("address")}
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    {t("launchDate")}
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    {t("actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr
                    key={plan._id}
                    className="border-b hover:bg-gray-50 transition-all duration-300"
                  >
                    <td className="py-3 px-4">{plan.projectName}</td>
                    <td className="py-3 px-4">{plan.typeOfActivity}</td>
                    <td className="py-3 px-4">{plan.address}</td>
                    <td className="py-3 px-4">
                      {plan.launchDate ? new Date(plan.launchDate).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleViewPlan(plan._id)}
                        className="bg-btnColor text-white font-semibold py-1 px-3 rounded hover:bg-hoverBtnColor transition duration-300"
                      >
                        {t("viewPlan")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>{t("noBusinessPlansFound")}</p>
        )}
      </div>
    </UserLayout>
  );
};

export default AllPlans;