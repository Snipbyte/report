"use client";
import AdminLayout from "@/app/components/layouts/adminLayout/page";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SubscribedUsers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // Fetch subscribed users
  const fetchSubscribedUsers = async () => {
    try {
      const response = await axios.post("/api/admin/fetchsubscribedUsers");
      setSubscribers(response.data.subscribers);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      setError("Failed to fetch subscribed users.");
    }
  };

  const exportToExcel = () => {
    if (subscribers.length === 0) {
      alert("No data available to export!");
      return;
    }

    // Prepare CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "No,Email,Subscribed On\n"; // Header row

    subscribers.forEach((subscriber, index) => {
      const row = `${index + 1},${subscriber.email},${new Date(subscriber.subscribedAt).toLocaleDateString()}`;
      csvContent += row + "\n"; // Add each subscriber's data
    });

    // Create a link and trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "SubscribedUsers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchSubscribedUsers();
  }, []);

  // Filter subscribers based on search term
  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Subscribed Users</h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {subscribers.length === 0 && !error ? (
          <div className="text-center text-gray-500">No subscribed users found.</div>
        ) : (
          <div className="overflow-x-auto">
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
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-3 px-6 text-left border-b">#</th>
                  <th className="py-3 px-6 text-left border-b">Email</th>
                  <th className="py-3 px-6 text-left border-b">Subscribed On</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-3 px-6 border-b">{index + 1}</td>
                    <td className="py-3 px-6 border-b">{subscriber.email}</td>
                    <td className="py-3 px-6 border-b">
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SubscribedUsers;