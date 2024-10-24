"use client";
import Header from "@/app/components/common/header/page";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true); // Set loading to true before the API call

    try {
      const response = await fetch("/api/admin/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setSuccess(data.message);
        // Handle successful login (e.g., redirect, store token)
        await localStorage.setItem("adminToken", data.token);

        // Now navigate to the dashboard
        router.push("/admin/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Login failed. Please try again later.");
    } finally {
      setLoading(false); // Reset loading state after the API call
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Admin {t("login")}</h2>

          {error && (
            <div className="p-4 text-red-600 bg-red-200 rounded">{error}</div>
          )}
          {success && (
            <div className="p-4 text-green-600 bg-green-200 rounded">
              {success}
            </div>
          )}

          {/* Show loading text if loading */}
          {loading && (
            <div className="p-4 text-blue-600 bg-blue-200 rounded text-center">
              {t("loading")}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="john@doe.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="*****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading} // Disable button if loading
              className={`w-full px-4 py-2 font-bold text-white rounded focus:outline-none focus:ring focus:ring-blue-300 ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-500"
              }`}
            >
              {loading ? "Please wait..." : t("login")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
