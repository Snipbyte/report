"use client";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai"; // Import delete icon
import { MdAdd } from "react-icons/md"; // Import add icon
import AdminLayout from "@/app/components/layouts/adminLayout/page";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAdmin, setNewAdmin] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("/api/admin/fetchadmins"); // Fetching all admins
        const data = await response.json();
        if (response.ok) {
          setAdmins(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch admins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/adminregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdmin),
      });
      const data = await response.json();
      window.location.reload();

      if (response.ok) {
        // Reset form and re-fetch admins
        setNewAdmin({ firstname: "", lastname: "", email: "", password: "" });
        setShowForm(false); // Hide form after adding
        fetchAdmins(); // Re-fetch the admins after adding a new one
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to add admin:", error);
    }
  };

  const handleDeleteAdmin = async (email) => {
    try {
      const response = await fetch("/api/admin/deleteadmin", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Sending the email to delete
      });
      const data = await response.json();
      window.location.reload();
      if (response.ok) {
        // Re-fetch admins after deletion
        fetchAdmins();
       
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to delete admin:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admins</h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
              {admins.map((admin) => (
                <li
                  key={admin._id}
                  className="flex justify-between items-center p-4 hover:bg-gray-100"
                >
                  <span className="text-lg">
                    {admin.firstname} {admin.lastname} - {admin.email}
                  </span>
                  <button
                    onClick={() => handleDeleteAdmin(admin.email)}
                    className="flex items-center text-red-600 hover:text-red-800 font-semibold transition duration-200"
                  >
                    <AiFillDelete className="mr-1" /> Delete
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowForm((prev) => !prev)} // Toggle form visibility
              className="mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 flex items-center"
            >
              <MdAdd className="mr-2" /> Add New Admin
            </button>
            {showForm && ( // Conditional rendering of the form
              <form
                onSubmit={handleAddAdmin}
                className="bg-white p-4 shadow-md rounded-lg mt-4"
              >
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={newAdmin.firstname}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 rounded-lg p-2"
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={newAdmin.lastname}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 rounded-lg p-2"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newAdmin.email}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 rounded-lg p-2"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newAdmin.password}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 rounded-lg p-2"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Add Admin
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Admins;
