"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to handle button state

  const onSubmit = async (data) => {
    setIsSubmitting(true); // Disable button and show loading text
    try {
      const response = await axios.post("/api/user/register", data);
      alert(response.data.message);
      reset(); // Reset form after successful registration
      router.push("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      alert(error.response?.data?.message || "Failed to register user");
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  return (
    <div className="md:w-1/2 w-full bg-lightCard md:p-16 p-10">
      <Link href="/">
        <Image
          className="w-20 h-14 mb-4"
          src="/images/logo.png"
          width={1000}
          height={1000}
          alt="Logo"
        />
      </Link>
      <h2 className="text-3xl font-bold">
        Keep your online <br />
        business organized
      </h2>
      <p className="text-sm text-paraColor mt-1">
        Sign up to start your 30 days free trial
      </p>
      <div className="flex items-center gap-2">
        <div className="border mt-8 w-32"></div>
        <p className="text-sm mt-7 text-paraColor">or</p>
        <div className="border mt-8 w-32"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name Input */}
        <div className="mt-3">
          <label className="text-sm">First Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter your first name"
            className="text-sm outline-none w-72 border-2 rounded p-1.5 mt-1"
            {...register("firstname", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "Name should be at least 2 characters",
              },
            })}
          />
          {errors.firstname && (
            <p className="text-red-600 text-sm">{errors.firstname.message}</p>
          )}
        </div>

        {/* Last Name Input */}
        <div className="mt-3">
          <label className="text-sm">Last Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter your last name"
            className="text-sm outline-none w-72 border-2 rounded p-1.5 mt-1"
            {...register("lastname", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Name should be at least 2 characters",
              },
            })}
          />
          {errors.lastname && (
            <p className="text-red-600 text-sm">{errors.lastname.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="mt-3">
          <label className="text-sm">Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            className="text-sm outline-none w-72 border-2 rounded p-1.5 mt-1"
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

        {/* Password Input */}
        <div className="mt-3">
          <label className="text-sm">Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            className="text-sm outline-none w-72 border-2 rounded p-1.5 mt-1"
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

        {/* Submit Button */}
        <div className="mt-5">
          <button
            type="submit"
            className={`text-black border-2 w-72 my-8 p-2 rounded-lg border-black duration-700 ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "hover:text-white hover:bg-black"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "Sign up"}
          </button>
        </div>
      </form>

      <Link href="login" className="text-sm my-2 text-paraColor">
        Already have an account?{" "}
        <span className="text-btnColor underline hover:text-hoverBtnColor">
          Login
        </span>
      </Link>
    </div>
  );
};

export default FormSection;
