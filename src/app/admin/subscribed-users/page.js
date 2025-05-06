"use client";
import AdminLayout from "@/app/components/layouts/adminLayout/page";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const SubscribedUsers = () => {
  const { t } = useTranslation(); // Initialize t function
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
      setError(t("subscribedUsers.error"));
    }
  };

  const exportToExcel = () => {
    if (subscribers.length === 0) {
      alert(t("subscribedUsers.no_data_alert"));
      return;
    }

    // Prepare CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `${t("subscribedUsers.table_headers.number")},${t("subscribedUsers.table_headers.email")},${t("subscribedUsers.table_headers.subscribed_on")}\n`; // Header row

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
        <h1 className="text-3xl font-bold text-center mb-6">{t("subscribedUsers.title")}</h1>
        <p className="text-center mb-4">{t("subscribedUsers.description")}</p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {subscribers.length === 0 && !error ? (
          <div className="text-center text-gray-500">{t("subscribedUsers.no_data")}</div>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex items-center mb-4">
              <div className="flex items-center w-full border border-gray-300 p-2.5">
                <FaSearch className="text-paraColor mr-2" />
                <input
                  type="text"
                  placeholder={t("subscribedUsers.search_placeholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full outline-none"
                />
              </div>
              <button
                className="w-52 p-2.5 bg-btnColor hover:bg-hoverBtnColor duration-300 text-white"
                onClick={exportToExcel}
              >
                {t("subscribedUsers.export_button")}
              </button>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-headingColor">
                  <th className="py-3 px-6 text-left border-b">{t("subscribedUsers.table_headers.number")}</th>
                  <th className="py-3 px-6 text-left border-b">{t("subscribedUsers.table_headers.email")}</th>
                  <th className="py-3 px-6 text-left border-b">{t("subscribedUsers.table_headers.subscribed_on")}</th>
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