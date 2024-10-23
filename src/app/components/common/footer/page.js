"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight, FaMailBulk } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import axios from "axios";

const Footer = () => {
  const { t } = useTranslation(); // Get translation function
  const { register, handleSubmit, reset } = useForm(); // Use react-hook-form
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Function to handle newsletter form submission
  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post("/api/admin/addnewsletter", {
        email: data.email,
      });

      if (response.status === 201) {
        setSuccess(t("subscriptionSuccess"));
        reset(); // Reset form fields after successful submission
      } else {
        setError(t("subscriptionFailed"));
      }
    } catch (err) {
      setError(t("subscriptionFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-tl from-desColor via-desColor to-[#0D1F2B] text-white p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between mt-5 mb-12">
        <div className="mb-4 lg:mb-0">
          <Link href="/">
            <Image
              className="w-24 h-16 my-2"
              src="/images/logo.png"
              width={1000}
              height={1000}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="w-full md:w-[55%] lg:w-[45%] my-2">
          <p className="text-lg lg:text-2xl font-bold">{t("inquiries")}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-8 lg:gap-[100px]">
        <div className="w-full lg:w-auto mb-6">
          <p className="font-bold text-xl my-2">{t("newsletterSignup")}</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-96"
          >
            <div className="flex items-center w-full">
              <FaMailBulk />
              <input
                className="p-2 outline-none border-b-[1px] bg-transparent py-3 my-2 w-full lg:w-80 border-white mb-4"
                type="email"
                placeholder={t("newsletterEmailPlaceholder")}
                {...register("email", { required: true })}
              />
              <button
                type="submit"
                className="ml-2 text-white bg-blue-600 p-2 rounded"
                disabled={loading}
              >
                <FaArrowRight />
              </button>
            </div>
          </form>

          {loading && <p className="text-yellow-400">{t("loading")}</p>}
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div className="flex gap-1 items-center my-2 text-gray-300">
            <input type="checkbox" />
            <p>{t("agreeToPrivacy")}</p>
            <button className="underline text-sm underline-offset-4 hover:text-blue-700">
              {t("privacyPolicy")}
            </button>
          </div>
        </div>

        {/* Additional sections */}
        <div className="w-full lg:w-auto mb-6">
          <p className="font-bold text-xl">{t("socials")}</p>
          <p className="text-gray-300 my-4 lg:my-6">{t("facebook")}</p>
          <p className="text-gray-300 my-4 lg:my-6">{t("twitter")}</p>
          <p className="text-gray-300 my-4 lg:my-6">{t("dribble")}</p>
          <p className="text-gray-300 my-4 lg:my-6">{t("instagram")}</p>
        </div>

        <div className="w-full lg:w-auto mb-6">
          <p className="font-bold text-xl">{t("menu")}</p>
          <Link className="text-gray-300 my-4 lg:my-6 block" href="/about">
            {t("aboutUs")}
          </Link>
          <Link className="text-gray-300 my-4 lg:my-6 block" href="/contact">
            {t("contact")}
          </Link>
          <Link className="text-gray-300 my-4 lg:my-6 block" href="/signup">
            {t("register")}
          </Link>
        </div>

        <div className="w-full lg:w-auto mb-6">
          <p className="font-bold text-xl">{t("sayHello")}</p>
          <p className="text-gray-300 my-4 lg:my-6">{t("email")}</p>
        </div>
      </div>
      <hr className="mt-12 lg:mt-16 border-gray-600" />
    </div>
  );
};

export default Footer;
