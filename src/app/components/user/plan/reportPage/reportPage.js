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
    <div className="bg-white p-6 rounded-lg ">
      <p className="text-xl font-medium text-gray-800 mb-2">
        <strong>Project Name:</strong>
        <span className="text-gray-600"> {reportData.projectName || "N/A"}</span>
      </p>
      <p className="text-xl font-medium text-gray-800 mb-2">
        <strong>Type of Activity:</strong>
        <span className="text-gray-600"> {reportData.typeOfActivity || "N/A"}</span>
      </p>
      <p className="text-xl font-medium text-gray-800 mb-2">
        <strong>Address:</strong>
        <span className="text-gray-600"> {reportData.address || "N/A"}</span>
      </p>
      <p className="text-xl font-medium text-gray-800 mb-2">
        <strong>Launch Date:</strong>
        <span className="text-gray-600">
          {new Date(reportData.launchDate).toLocaleDateString() || "N/A"}
        </span>
      </p>
    </div>
  </>
)}


      {/* Presentation */}
      {reportData.presentation &&
  renderSection(
    "Presentation",
    <>
      <div className="bg-white p-6 rounded-lg ">
        {Object.entries(reportData.presentation).map(([key, value]) => (
          <div key={key} className="mb-4">
            <p className="text-xl font-medium text-gray-800 mb-2">
            
            </p>
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </div>
        ))}
      </div>
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

      {/* Carrier Information */}
      {reportData.carrier &&
        renderSection(
          "Carrier Information",
          Object.entries(reportData.carrier).map(([key, data]) => (
            <div key={key}>
              <p>
                <strong>Business Leader:</strong> {data.businessLeader}
              </p>
              <p>
                <strong>Industry Experience:</strong> {data.industryExperience}
              </p>
              <p>
                <strong>Family Situation:</strong> {data.familySituation}
              </p>
              <div
                dangerouslySetInnerHTML={{ __html: data.editorContent }}
              />
            </div>
          ))
        )}

      {/* Services */}
      {reportData.services &&
        renderSection(
          "Services",
          Object.entries(reportData.services).map(([key, service]) => (
            <div key={key}>
              <p>
                <strong>Name:</strong> {service.name}
              </p>
              <div
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>
          ))
        )}

      {/* Market Analysis */}
      {reportData.market &&
  renderSection(
    "Market Analysis",
    Object.entries(reportData.market).map(([key, market]) => (
      <div key={key} className="mb-6">
        <div className="mb-4">
          <strong className="text-xl font-medium text-gray-800">Market Description:</strong>
          <div
            dangerouslySetInnerHTML={{ __html: market.marketDescription }}
            className="text-lg text-gray-700 mt-2"
          />
        </div>

        <div>
          <strong className="text-xl font-medium text-gray-800">Responses:</strong>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {Object.entries(market.responses).map(([responseKey, responseValue], index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <strong className="text-gray-800">{responseKey}:</strong>
                <div className="text-gray-700">{responseValue}</div>
              </div>
            ))}
          </div>
        </div>
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
          Object.entries(reportData.customers).map(([key, customer]) => (
            <div key={key} className="mb-4">
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

      {/* Sales Pitches */}
      {reportData.salesPitches &&
        renderSection(
          "Sales Pitches",
          Object.entries(reportData.salesPitches).map(([key, pitch]) => (
            <div key={key}>
              <div
                dangerouslySetInnerHTML={{ __html: pitch }}
              />
            </div>
          ))
        )}

      {/* Customer Acquisition Actions */}
      {reportData.customerAcquisitionActions &&
        renderSection(
          "Customer Acquisition Actions",
          Object.values(reportData.customerAcquisitionActions).map((action, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>Name:</strong> {action.name}
              </p>
              <div
                dangerouslySetInnerHTML={{ __html: action.description }}
              />
            </div>
          ))
        )}

      {/* Financial Results */}
      {reportData.financialResults && (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-gray-700 mb-2">Financial Results</h2>
    <div className="bg-white shadow-md p-6 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <strong className="text-lg font-medium text-gray-800">Total Revenue:</strong>
          <span className="text-xl text-gray-700">{reportData.financialResults.totalRevenue.toFixed(2) || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <strong className="text-lg font-medium text-gray-800">Total Product Costs:</strong>
          <span className="text-xl text-gray-700">{reportData.financialResults.totalProductCosts.toFixed(2) || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <strong className="text-lg font-medium text-gray-800">Gross Margin:</strong>
          <span className="text-xl text-gray-700">{reportData.financialResults.grossMargin.toFixed(2) || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <strong className="text-lg font-medium text-gray-800">Total Charges:</strong>
          <span className="text-xl text-gray-700">{reportData.financialResults.totalCharges.toFixed(2) || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <strong className="text-lg font-medium text-gray-800">Added Value:</strong>
          <span className="text-xl text-gray-700">{reportData.financialResults.addedValue.toFixed(2) || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <strong className="text-lg font-medium text-gray-800">Total Salaries:</strong>
          <span className="text-xl text-gray-700">{reportData.financialResults.totalSalaries.toFixed(2) || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <strong className="text-lg font-medium text-gray-800">EBITDA:</strong>
          <span className="text-xl text-gray-700">{reportData.financialResults.EBITDA.toFixed(2) || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <strong className="text-lg font-medium text-gray-800">Profitability:</strong>
          <div className="text-xl text-gray-700">
            {reportData.financialResults.profitability.isProfitable ? "Profitable" : "Not Profitable"}
          </div>
        </div>
        {reportData.financialResults.profitability.EBITDAMargin && (
          <div className="flex flex-col">
            <strong className="text-lg font-medium text-gray-800">EBITDA Margin:</strong>
            <span className="text-xl text-gray-700">{reportData.financialResults.profitability.EBITDAMargin || "N/A"}</span>
          </div>
        )}
        {reportData.financialResults.profitability.debtCoverageRatio && (
          <div className="flex flex-col">
            <strong className="text-lg font-medium text-gray-800">Debt Coverage Ratio:</strong>
            <span className="text-xl text-gray-700">{reportData.financialResults.profitability.debtCoverageRatio || "N/A"}</span>
          </div>
        )}
      </div>

      {/* Scoring */}
      <div className="mt-6">
        <strong className="text-lg font-medium text-gray-800">Scoring:</strong>
        <div className="text-xl text-gray-700 mt-2">
          <p><strong>Market Potential Index:</strong> {reportData.financialResults.scoring.marketPotentialIndex}</p>
          <p><strong>Recommendation:</strong> {reportData.financialResults.scoring.recommendation}</p>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ReportPage;
