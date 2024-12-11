"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/app/components/layouts/adminLayout/page";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; // Import FaSearch icon

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(null);
  const [businessPlans, setBusinessPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter business plans based on search input
  const filteredPlans = businessPlans.filter((plan) =>
    plan.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, businessPlansRes] = await Promise.all([
          axios.post("/api/admin/fetchusers"),
          axios.get("/api/admin/fetchbusinessplandetails"),
        ]);

        setUsersCount(usersRes.data.users.length);
        setBusinessPlans(
          businessPlansRes.data.businessPlans || []
        );
      } catch (err) {
        setError("Error fetching dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const exportToExcel = () => {
    // Simulating your dashboard data
    const dashboardData = [
      { companyName: "Tech Corp", revenue: "500K", employees: 120 },
      { companyName: "Soft Solutions", revenue: "1.2M", employees: 300 },
      { companyName: "Innovate Inc", revenue: "750K", employees: 200 },
    ];

    // Filter the data based on the search term
    const filteredData = searchTerm
      ? dashboardData.filter((item) =>
        item.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : dashboardData;

    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Company Name,Revenue,Employees\n"; // Headers

    // Add filtered data rows
    filteredData.forEach((item) => {
      const row = `${item.companyName},${item.revenue},${item.employees}`;
      csvContent += row + "\n";
    });

    // Create a downloadable link for the CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dashboard_data.csv");
    document.body.appendChild(link);

    // Trigger the download
    link.click();
    document.body.removeChild(link);
  };




  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-2xl font-semibold">Total Users</h2>
              <p className="text-4xl font-bold text-blue-600 mt-4">{usersCount}</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-2xl font-semibold">Total Business Plans</h2>
              <p className="text-4xl font-bold text-green-600 mt-4">{businessPlans.length}</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-2">
              <h2 className="text-2xl font-semibold text-center mb-4">
                Business Plans Breakdown
              </h2>
              {businessPlans.length > 0 ? (
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <FaSearch className="text-gray-500 mr-2" />
                    <input
                      type="text"
                      placeholder="Search by company name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      className="w-32 p-2.5 bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={exportToExcel}
                    >
                      Export File
                    </button>
                  </div>



                  <div className="overflow-y-auto max-h-[400px] border border-gray-300 rounded-lg">
                    {filteredPlans.length > 0 ? (
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100 sticky top-0">
                            <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
                              Company Name
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
                              Industry
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
                              Location
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPlans.map((plan) => (
                            <tr key={plan._id} className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                                {plan.companyName}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                                {plan.industrySector}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                                {plan.location}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-center text-gray-500 p-4">
                        No business plans found
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500">No business plans found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
