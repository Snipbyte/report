"use client";
import AdminLayout from "@/app/components/layouts/adminLayout/page";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SubscribedUsers = () => {
  const [subscribers, setSubscribers] = useState([]);
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

  useEffect(() => {
    fetchSubscribedUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Subscribed Users
        </h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {subscribers.length === 0 && !error ? (
          <div className="text-center text-gray-500">
            No subscribed users found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscribers.map((subscriber, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {subscriber.email}
                </h2>
                <p className="text-gray-500">
                  Subscribed on:{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
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

export default SubscribedUsers;
