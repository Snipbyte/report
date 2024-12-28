"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; 
import PlanMainPage from "@/app/components/user/plan/planMainPage/planMainPage";

const Plan = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initializePlan = async () => {
      if (searchParams.has("report")) {
        console.log("Report query parameter exists. Skipping API call.");
        return;
      }

      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!token) {
          console.error("Authorization token not found in localStorage");
          return;
        }

        const response = await fetch("/api/generatereport/initialize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error creating plan:", errorData.message);
          return;
        }

        const responseData = await response.json();
        const planId = responseData._id; // Assuming the API response includes the plan's ID
        console.log("Plan created successfully:", planId);

        // Store the plan ID in localStorage
        localStorage.setItem("planId", planId);

        // Redirect to the URL with the report query parameter
        router.push(`/user/plan?report=${planId}`);
      } catch (error) {
        console.error("Failed to initialize plan:", error.message);
      }
    };

    initializePlan();
  }, [searchParams, router]); // Include dependencies

  return (
    <div>
      <PlanMainPage />
    </div>
  );
};

export default Plan;
