// pages/admin/users.js
"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/app/components/layouts/adminLayout/page";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    currentPlan: "",
  });

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
    setDeletingUserId(userId);
    try {
      await axios.post("/api/admin/deleteuser", { id: userId });
      window.location.reload();
    } catch (error) {
      setError("Error deleting user");
    } finally {
      setDeletingUserId(null);
    }
  };

  // Function to handle edit user
  const handleEditUser = async () => {
    try {
      await axios.put("/api/admin/edituser", {
        id: editingUser._id,
        ...editFormData,
      });
      setEditingUser(null);
      window.location.reload();
    } catch (error) {
      setError("Error editing user");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Users</h1>

        {loading && (
          <p className="text-center text-blue-500 font-semibold">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
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
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white`}
                  disabled={deletingUserId === user._id}
                >
                  {deletingUserId === user._id ? "Deleting..." : "Delete User"}
                </button>
                <button
                  onClick={() => {
                    setEditingUser(user);
                    setEditFormData({
                      firstname: user.firstname,
                      lastname: user.lastname,
                      email: user.email,
                      currentPlan: user.currentPlan || "",
                    });
                  }}
                  className="mt-4 mx-2 py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Edit User
                </button>
              </div>
            ))}
          </div>
        )}

        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Edit User</h2>
              <input
                name="firstname"
                value={editFormData.firstname}
                onChange={handleInputChange}
                className="border p-2 w-full mb-4"
                placeholder="First Name"
              />
              <input
                name="lastname"
                value={editFormData.lastname}
                onChange={handleInputChange}
                className="border p-2 w-full mb-4"
                placeholder="Last Name"
              />
              <input
                name="email"
                value={editFormData.email}
                onChange={handleInputChange}
                className="border p-2 w-full mb-4"
                placeholder="Email"
              />
              <select
                name="currentPlan"
                value={editFormData.currentPlan}
                onChange={handleInputChange}
                className="border p-2 w-full mb-4"
              >
                <option value="none">None</option>
                <option value="intro">Intro</option>
                <option value="base">Base</option>
                <option value="popular">Popular</option>
                <option value="enterprise">Enterprise</option>
              </select>

              <button
                onClick={handleEditUser}
                className="py-2 px-4 rounded bg-green-500 hover:bg-green-600 text-white"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="ml-4 py-2 px-4 rounded bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;
