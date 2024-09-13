"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormSection = () => {
  // Manage form state and errors
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true
    try {
      const response = await axios.post("/api/user/login", data);
      alert(response.data.message);
      setLoading(false);
      localStorage.setItem("userToken", response.data.token);
      router.push("/generate-report");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="md:w-1/2 w-full bg-lightCard  md:p-16 p-10">
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
        <div className="mt-3">
          <label className="text-sm">Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter your Email"
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

        <div className="mt-3">
          <label className="text-sm">Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter your Password"
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

        <div className="mt-5">
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`text-black border-2 w-72 p-2 my-8 rounded-lg border-black duration-700 ${
              loading ? "bg-gray-400" : "hover:text-white hover:bg-black"
            }`}
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </div>
      </form>

      <Link href="signup" className="text-sm my-2 text-paraColor">
        Don't have an account?{" "}
        <span className="text-btnColor underline hover:text-hoverBtnColor">
          Signup
        </span>
      </Link>
    </div>
  );
};

export default FormSection;
