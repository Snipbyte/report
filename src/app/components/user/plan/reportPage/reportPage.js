import React, { useEffect, useState } from "react";

const ReportPage = () => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch data from localStorage
    const storedData = JSON.parse(localStorage.getItem("planData"));
    const planId = localStorage.getItem("planId");
    if (planId && storedData) {
      const dataForPlan = Object.keys(storedData).reduce((acc, key) => {
        acc[key] = storedData[key][planId] || {};
        return acc;
      }, {});
      setReportData(dataForPlan);
    }
  }, []);

  if (!reportData) {
    return <p className="text-center mt-10 text-gray-500">Loading report...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Report</h1>

      {/* General Idea Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Idea</h2>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <p>
            <strong>Type of Activity:</strong>{" "}
            {reportData.idea?.typeOfActivity || "N/A"}
          </p>
          <p>
            <strong>Project Name:</strong>{" "}
            {reportData.idea?.projectName || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {reportData.idea?.address || "N/A"}
          </p>
          <p>
            <strong>Launch Date:</strong> {reportData.idea?.launchDate || "N/A"}
          </p>
        </div>
      </div>

      {/* Sections Loop */}
      {[
        "presentation",
        "visitingCard",
        "carrier",
        "services",
        "market",
        "competitors",
        "customers",
        "salesPitches",
        "customerAcquisitionActions",
      ].map((section) => (
        <div key={section} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2 capitalize">
            {section.replace(/([A-Z])/g, " $1")}
          </h2>
          <div className="bg-white shadow-md p-4 rounded-lg">
            {reportData[section] && Object.keys(reportData[section]).length ? (
              Object.keys(reportData[section]).map((key) => (
                <div key={key} className="mb-4 border-b pb-4 last:border-b-0">
                  <p>
                    <strong>ID:</strong> {key}
                  </p>
                  <pre className="whitespace-pre-wrap text-sm text-gray-600">
                    {JSON.stringify(reportData[section][key], null, 2)}
                  </pre>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No data available for this section.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportPage;
