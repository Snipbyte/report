"use client";
import UserLayout from "@/app/components/layouts/userLayout/page";
import React, { useState, useEffect } from "react";
import { CiUnlock } from "react-icons/ci";
import { FaLock } from "react-icons/fa";

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
      <div className="max-w-lg mx-auto p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-headingColor mb-6 flex items-center justify-center gap-3">
          <CiUnlock className="text-btnColor w-7 h-7" />
          Update Password
        </h1>
        {message && (
          <p className="text-red-600 bg-red-50 p-3 rounded-md mb-6 text-sm font-medium">
            {message}
          </p>
        )}
        <form
          onSubmit={handleUpdatePassword}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md"
        >
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor transition duration-200 bg-gray-50 text-headingColor placeholder-gray-400"
              placeholder="Enter current password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor transition duration-200 bg-gray-50 text-headingColor placeholder-gray-400"
              placeholder="Enter new password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-btnColor text-white font-semibold py-3 rounded-lg hover:bg-hoverBtnColor focus:outline-none focus:ring-2 focus:ring-btnColor focus:ring-offset-2 transition duration-200"
          >
            Update Password
          </button>
        </form>
      </div>
    </UserLayout>
  );
};

export default UpdatePassword;