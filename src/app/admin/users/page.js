// pages/admin/users.js
"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/app/components/layouts/adminLayout/page";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null); // State to track which user is being deleted

  // Fetch users from the API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/fetchusers");
        setUsers(response.data.users);
      } catch (error) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a user
  const deleteUser = async (userId) => {
    setDeletingUserId(userId); // Set the user ID being deleted
    try {
      await axios.post("/api/admin/deleteuser", { id: userId }); // Send POST request with user ID
      
      // Reload the page after successful deletion
      window.location.reload(); 
      
    } catch (error) {
      setError("Error deleting user");
    } finally {
      setDeletingUserId(null); // Reset after the deletion process
    }
  };

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
                <button
                  onClick={() => deleteUser(user._id)}
                  className={`mt-4 py-2 px-4 rounded transition duration-300 ${
                    deletingUserId === user._id
                      ? "bg-gray-400 cursor-not-allowed" // Change color and cursor when deleting
                      : "bg-red-500 hover:bg-red-600"
                  } text-white`}
                  disabled={deletingUserId === user._id} // Disable button if this user is being deleted
                >
                  {deletingUserId === user._id ? "Deleting..." : "Delete User"} {/* Show loading text */}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;
