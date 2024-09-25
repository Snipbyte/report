"use client";
import UserLayout from "@/app/components/layouts/userLayout/page";
import React, { useState, useEffect } from "react";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous message

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/user/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Failed to update password:", error);
      setMessage("An error occurred while updating the password.");
    }
  };

  return (
    <UserLayout>
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Update Password</h1>
        {message && <p className="text-red-600 mb-4">{message}</p>}
        <form
          onSubmit={handleUpdatePassword}
          className="bg-white p-6 shadow-md rounded-lg"
        >
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200 w-full"
          >
            Update Password
          </button>
        </form>
      </div>
    </UserLayout>
  );
};

export default UpdatePassword;
