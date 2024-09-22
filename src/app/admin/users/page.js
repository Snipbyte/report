// pages/admin/users.js
"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/app/components/layouts/adminLayout/page";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]); // Store users data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch users from the API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/fetchusers");
        setUsers(response.data.users); // Update users state
      } catch (error) {
        setError("Error fetching users"); // Handle error
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []);

  // Render the component
  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Users</h1>

        {loading && (
          <p className="text-center text-blue-500 font-semibold">
            Loading...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 font-semibold">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {user.firstname} {user.lastname}
                </h2>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Plan:{" "}
                  <span className="font-medium">
                    {user.currentPlan || "None"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;
