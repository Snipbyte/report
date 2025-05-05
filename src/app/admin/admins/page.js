"use client";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai"; // Import delete icon
import { MdAdd } from "react-icons/md"; // Import add icon
import AdminLayout from "@/app/components/layouts/adminLayout/page";
import { FaSearch } from "react-icons/fa";

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
  const [searchTerm, setSearchTerm] = useState(""); // For searching admins

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

  // Filter admins based on search term
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export to Excel functionality
  const exportToExcel = () => {
    // Create a CSV string from table data
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Email\n"; // Add headers

    // Add admin data to the CSV
    admins.forEach((admin) => {
      const row = `${admin.firstname} ${admin.lastname},${admin.email}`;
      csvContent += row + "\n";
    });

    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "admins_data.csv");
    document.body.appendChild(link); // Required for Firefox

    // Trigger the download
    link.click();
    document.body.removeChild(link); // Clean up
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admins</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            {/* Search Bar */}
            <div className="flex items-center mb-4">
              <div className="flex items-center w-full border border-gray-300 p-2.5">
                <FaSearch className="text-paraColor mr-2" />
                <input
                  type="search"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full outline-none"
                />
              </div>
              <button
                className="w-44 p-2.5 bg-btnColor hover:bg-hoverBtnColor duration-300 text-white"
                onClick={exportToExcel}
              >
                Export Excel File
              </button>
            </div>

            {/* Admins Table */}
            <table className="min-w-full border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map((admin) => (
                  <tr key={admin._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {admin.firstname} {admin.lastname}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{admin.email}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteAdmin(admin.email)}
                        className="py-1 px-2 rounded bg-red-500 hover:bg-red-600 text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add New Admin Button */}
            <button
              onClick={() => setShowForm((prev) => !prev)} // Toggle form visibility
              className="mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 flex items-center"
            >
              <MdAdd className="mr-2" /> Add New Admin
            </button>

            {/* Add Admin Form */}
            {showForm && (
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
                    className="bg-btnColor text-white font-semibold py-2 rounded-lg hover:bg-hoverBtnColor transition duration-300"
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
