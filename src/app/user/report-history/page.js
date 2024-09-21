"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HistoryTable from "../../components/reportHistory/historyTable/page";
import PlanCard from "../../components/reportHistory/planCard/page";
import UserLayout from "@/app/components/layouts/userLayout/page";

const ReportHistory = () => {
  const [businessPlans, setBusinessPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // To capture API success message

  // Function to fetch user plans
  const fetchBusinessPlans = async () => {
    try {
      const token = localStorage.getItem("token"); // Make sure token is correct
      if (!token) {
        throw new Error("Token not found. Please log in.");
      }

      const response = await axios.get("/api/getUserPlans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.businessPlans && response.data.businessPlans.length > 0) {
        setBusinessPlans(response.data.businessPlans);
        setMessage(response.data.message); // Capture success message
      } else {
        setMessage(response.data.message); // No plans, but a valid API message
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching business plans:", err);

      // Check if there's a response message in the error
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to load business plans.");
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessPlans();
  }, []);

  if (loading) {
    return (
      <UserLayout>
        <div className="p-2">
          <p className="text-3xl font-bold text-headingColor my-4">Loading...</p>
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <div className="p-2">
          <p className="text-3xl font-bold text-red-500 my-4">{error}</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="p-2">
        <p className="text-3xl font-bold text-headingColor my-4">Latest History</p>

        <div className="w-full md:flex block items-center gap-6">
    {businessPlans.length === 0 ? (
        <p>{message || "No business plans available."}</p> // Display the real message from API
    ) : (
        businessPlans.slice(0, 2).map((plan) => ( // Use slice to get the latest 2 plans
            <PlanCard
                key={plan._id}
                isprofessioanl={false} // Customize this prop based on your logic
                heading={plan.companyName}
                rate="N/A" // Assuming you don't have monthly rate data in the response
                days={`Established: ${new Date(plan.dateOfEstablishment).toLocaleDateString()}`}
                btn="View Details"
            />
        ))
    )}
</div>


        <p className="text-3xl font-bold text-headingColor my-4">Report History</p>
        <HistoryTable businessPlans={businessPlans} />
      </div>
    </UserLayout>
  );
};

export default ReportHistory;
