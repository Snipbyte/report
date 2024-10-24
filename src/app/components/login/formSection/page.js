"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const FormSection = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues, // Get values from the form
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Handle login form submission
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/login", data);
      alert(response.data.message);
      await localStorage.setItem("token", response.data.token);
      router.push("/user/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle forgot password submission
  const handleForgotPassword = async () => {
    const email = getValues("email"); // Use getValues to get the email from the form
    if (!email) {
      setErrorMessage("Please enter your email"); // Set error message if email is empty
      return;
    }
    setErrorMessage(""); // Clear any previous error messages
    setForgotPasswordLoading(true);
    setMessage("");
    try {
      const response = await axios.post("/api/user/forget-password", { email });
      setMessage(
        "An email has been sent to you with a random password. Use that password to login."
      );
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessage(
        error.response?.data?.message ||
          "Failed to send email. Please try again."
      );
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  return (
    <div className="w-full bg-lightCard md:p-16 p-10">
      <Link href="/">
        <Image
          className="w-20 h-14 mb-4"
          src="/images/logo.png"
          width={1000}
          height={1000}
          alt="Logo"
        />
      </Link>
      <h2 className="text-3xl font-bold">{t("loginText")}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-3">
          <label className="text-sm">Email</label>
          <br />
          <input
            type="email"
            placeholder="john@doe.com"
            className="text-sm outline-none w-full border-2 rounded p-1.5 mt-1"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-3">
          <label className="text-sm">Password</label>
          <br />
          <input
            type="password"
            placeholder="******"
            className="text-sm outline-none w-full border-2 rounded p-1.5 mt-1"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="mt-5">
          <button
            type="submit"
            disabled={loading}
            className={`text-black border-2 w-full p-2 my-8 rounded-lg border-black duration-700 ${
              loading ? "bg-gray-400" : "hover:text-white hover:bg-black"
            }`}
          >
            {loading ? "Please wait..." : t("login")}
          </button>
        </div>
      </form>
      <button
        onClick={handleForgotPassword} // Call the new function directly
        className={`text-black border-2 w-full p-2 my-2 rounded-lg border-black duration-700 ${
          forgotPasswordLoading
            ? "bg-gray-400"
            : "hover:text-white hover:bg-black"
        }`}
        disabled={forgotPasswordLoading}
      >
        {forgotPasswordLoading ? "Sending..." : t("forgetPass")}
      </button>
      {message && <p className="text-green-600 text-sm">{message}</p>}
      {errorMessage && (
        <p className="text-red-600 text-sm">{errorMessage}</p>
      )}{" "}
      {/* Display the error message */}
      <Link href="signup" className="text-sm my-2 text-paraColor">
        {t("noAccount")}{" "}
        <span className="text-btnColor underline hover:text-hoverBtnColor">
          {t("signup")}
        </span>
      </Link>
    </div>
  );
};

export default FormSection;
