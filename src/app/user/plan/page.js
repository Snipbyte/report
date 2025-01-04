"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PlanMainPage from "@/app/components/user/plan/planMainPage/planMainPage";

const Plan = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const reportId = searchParams.get("report");

  useEffect(() => {
    const initializePlan = async () => {
      if (reportId) {
        console.log("Report query parameter exists. Skipping API call.");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("UnAuthorized, Please Log in First");
        }

        const response = await fetch("/api/generatereport/initialize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create plan.");
        }

        const responseData = await response.json();
        const planId = responseData._id; // Plan ID from API response
        const financialDataId = responseData.financialData; // Financial Data ID from API response

        console.log("Plan created successfully:", planId);
        localStorage.setItem("planId", planId);
        // Construct the updated payload structure
        const updatedPlanData = {
          planId,
          planData: {
            financialData: {
              id: financialDataId,
              data: {}, // Placeholder for further financial data
            },
          },
        };

        // Save the updated payload to localStorage
        localStorage.setItem("planData", JSON.stringify(updatedPlanData));

        // Redirect to the URL with the report query parameter
        window.location.href = `/user/plan?report=${planId}`;
      } catch (error) {
        setError(error.message);
        console.error("Failed to initialize plan:", error.message);
      } finally {
        setLoading(false);
      }
    };

    initializePlan();
  }, [reportId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Initializing plan...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100 text-red-800">
        <div className="max-w-md w-full p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Initialization Failed</h1>
          <p className="mb-4">{error}</p>
          <a
            href="/"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PlanMainPage />
    </div>
  );
};

const PlanWithSuspense = () => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Loading...</div>
      </div>
    }
  >
    <Plan />
  </Suspense>
);

export default PlanWithSuspense;
