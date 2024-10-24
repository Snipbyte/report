"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const BlogNews = () => {
  const { t } = useTranslation();

  return (
    <div className="my-1 bg-black relative">
      <div className="lg:flex block">
        {/* Image Section */}
        <div className="relative lg:w-[50%] w-full h-full">
          <Image
            width={1000}
            height={1000}
            src="/images/social.png"
            alt="Analytics Image"
            className="w-full lg:h-[600px] h-[300px] object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black"></div>
        </div>
        {/* Content Section */}
        <div className="w-full lg:w-[50%] bg-black shadow-2xl p-5 lg:p-10">
          <div className="w-14 h-1.5 bg-btnColor mt-5 lg:mt-10 mb-10 lg:mb-20"></div>
          <p className="text-white my-5 text-xl lg:text-2xl font-bold">
            {t("blogNewsfinal")}
          </p>
          <div className="w-full lg:w-80 h-0.5 bg-white"></div>
          <ul className="list-disc list-inside p-2 text-white w-full lg:w-96 text-base lg:text-lg mt-10 lg:mt-20">
            <li>{t("stayInform")}</li>
            <li>{t("stay2")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogNews;
