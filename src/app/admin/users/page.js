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
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users from the API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post("/api/admin/fetchusers");
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
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
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
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editingUser._id ? { ...user, ...editFormData } : user
        )
      );
      setEditingUser(null);
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

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // for export button
  const exportToExcel = () => {
    // Create a CSV string from table data
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Email,Plan\n"; // Add headers

    // Add user data to the CSV
    users.forEach((user) => {
      const row = `${user.firstname} ${user.lastname},${user.email},${user.currentPlan || "None"}`;
      csvContent += row + "\n";
    });

    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_data.csv");
    document.body.appendChild(link); // Required for Firefox

    // Trigger the download
    link.click();
    document.body.removeChild(link); // Clean up
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
          <div>
            {/* Search Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                className="w-44 p-2.5 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={exportToExcel}
              >
                Export Excel File
              </button>

            </div>
            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Email
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Plan
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        {user.firstname} {user.lastname}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.currentPlan || "None"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => deleteUser(user._id)}
                          className={`py-1 px-2 rounded ${deletingUserId === user._id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                            } text-white`}
                          disabled={deletingUserId === user._id}
                        >
                          {deletingUserId === user._id ? "Deleting..." : "Delete"}
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
                          className="ml-2 py-1 px-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
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
              <div className="flex justify-end">
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
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;
