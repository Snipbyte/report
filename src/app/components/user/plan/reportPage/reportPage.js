"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportPage = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      const planId = localStorage.getItem("planId");
      if (!planId) {
        setError("No Plan Id Found");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized. Please log in first.");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          "/api/generatereport/result",
          { planId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReportData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch report data.");
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

  const renderSection = (title, content) => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
      <div className="bg-white shadow-md p-4 rounded-lg">{content}</div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Detailed Report</h1>

      {/* General Information */}
      {renderSection(
        "General Information",
        <>
          <p>
            <strong>Project Name:</strong> {reportData.projectName || "N/A"}
          </p>
          <p>
            <strong>Type of Activity:</strong>{" "}
            {reportData.typeOfActivity || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {reportData.address || "N/A"}
          </p>
          <p>
            <strong>Launch Date:</strong>{" "}
            {new Date(reportData.launchDate).toLocaleDateString() || "N/A"}
          </p>
        </>
      )}

      {/* Financials */}
      {reportData.financials &&
        renderSection(
          "Financials",
          <>
            {Object.entries(reportData.financials).map(([key, value]) => (
              <p key={key}>
                <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
                {value}
              </p>
            ))}
          </>
        )}

      {/* Visiting Cards */}
      {reportData.visitingCard &&
        renderSection(
          "Visiting Cards",
          Object.values(reportData.visitingCard).map((card, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>Name:</strong> {`${card.firstName} ${card.lastName}`}
              </p>
              <p>
                <strong>Title:</strong> {card.title}
              </p>
              <p>
                <strong>Contact:</strong> {card.contact}
              </p>
              <p>
                <strong>Email:</strong> {card.email}
              </p>
              <p>
                <strong>Country:</strong> {card.selectedCountry?.name || "N/A"}
              </p>
            </div>
          ))
        )}

      {/* Competitors */}
      {reportData.competitors &&
        renderSection(
          "Competitors",
          Object.values(reportData.competitors).flatMap(
            (competitorList, index) =>
              competitorList.map((competitor, subIndex) => (
                <div key={`${index}-${subIndex}`} className="mb-4">
                  <p>
                    <strong>Name:</strong> {competitor.name}
                  </p>
                  <p>
                    <strong>Price Status:</strong> {competitor.priceStatus}
                  </p>
                </div>
              ))
          )
        )}

      {/* Customers */}
      {reportData.customers &&
        renderSection(
          "Customers",
          Object.values(reportData.customers).map((customer, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>Name:</strong> {customer.name}
              </p>
              <p>
                <strong>Type:</strong> {customer.type}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                <div
                  dangerouslySetInnerHTML={{ __html: customer.description }}
                />
              </p>
            </div>
          ))
        )}

      {/* Market */}
      {reportData.market &&
        renderSection(
          "Market Analysis",
          Object.values(reportData.market).map((market, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>Description:</strong>{" "}
                <div
                  dangerouslySetInnerHTML={{ __html: market.marketDescription }}
                />
              </p>
              <p>
                <strong>Responses:</strong> {JSON.stringify(market.responses)}
              </p>
            </div>
          ))
        )}

      {/* More sections as needed */}
    </div>
  );
};

export default ReportPage;
