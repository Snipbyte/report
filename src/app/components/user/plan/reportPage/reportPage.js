"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportPage = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      const planId = localStorage.getItem("planId"); // Retrieve planId from localStorage

      if (!planId) {
        setError("No Plan Id Found");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!token) {
          setError("UnAuthorized , Please Log in First");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          "/api/generatereport/result",
          { planId }, // Pass the planId in the request body
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the Authorization header
            },
          }
        );

        setReportData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch report data.");
        console.error("Error fetching report data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-gray-500">Loading report...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100 text-red-800">
        <div className="max-w-md w-full p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
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

  if (!reportData) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No report data available.
      </p>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Report</h1>

      {/* Report Data Rendering */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Idea</h2>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <p>
            <strong>Project Name:</strong> {reportData.projectName || "N/A"}
          </p>
          <p>
            <strong>Profitability:</strong> {reportData.profitability || "N/A"}
          </p>
          <p>
            <strong>EBITDA:</strong> {reportData.ebitda || "N/A"}
          </p>
          <p>
            <strong>EBITDA Margin:</strong> {reportData.ebitdaMargin || "N/A"}
          </p>
          <p>
            <strong>Debt Coverage Ratio:</strong>{" "}
            {reportData.debtCoverageRatio || "N/A"}
          </p>
          <p>
            <strong>Score:</strong> {reportData.score || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
