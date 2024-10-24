"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/app/components/layouts/adminLayout/page";
import axios from "axios";

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(null);            // Users count
  const [businessPlans, setBusinessPlans] = useState([]);        // List of business plans
  const [loading, setLoading] = useState(true);                  // Loading state
  const [error, setError] = useState(null);                      // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users and business plans data from APIs
        const [usersRes, businessPlansRes] = await Promise.all([
          axios.post("/api/admin/fetchusers"),             // Fetch users from /api/admin/fetchusers
          axios.get("/api/admin/fetchbusinessplandetails")      // Fetch business plans from /api/admin/fetchbusinessplans
        ]);

        // Set users count
        setUsersCount(usersRes.data.users.length); // Assuming 'users' array is returned

        // Set business plans data
        if (businessPlansRes.data.businessPlans && businessPlansRes.data.businessPlans.length > 0) {
          setBusinessPlans(businessPlansRes.data.businessPlans);
        } else {
          setBusinessPlans([]); // No business plans found
        }

      } catch (err) {
        setError("Error fetching dashboard data"); // Set error message if APIs fail
      } finally {
        setLoading(false); // Set loading to false once data is fetched or on error
      }
    };

    fetchData(); // Fetch dashboard data on component mount
  }, []);

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Users Card */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-2xl font-semibold">Total Users</h2>
              <p className="text-4xl font-bold text-blue-600 mt-4">{usersCount}</p>
            </div>

            {/* Total Business Plans Card */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-2xl font-semibold">Total Business Plans</h2>
              <p className="text-4xl font-bold text-green-600 mt-4">{businessPlans.length}</p>
            </div>

            {/* Business Plans Breakdown */}
            <div className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-2">
              <h2 className="text-2xl font-semibold text-center mb-4">
                Business Plans Breakdown
              </h2>
              {businessPlans.length > 0 ? (
                <ul className="flex flex-wrap justify-center">
                  {businessPlans.map((plan) => (
                    <li key={plan._id} className="w-1/2 md:w-1/4 p-2 text-center">
                      <div className="bg-gray-100 p-4 rounded-lg shadow-sm h-[250px]">
                        <p className="text-lg font-bold capitalize">{plan.companyName}</p>
                        <p className="text-sm text-gray-700">Industry: {plan.industrySector}</p>
                        <p className="text-sm text-gray-700">Location: {plan.location}</p>
                      </div>
                    </li>
                  ))}
                </ul>
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
