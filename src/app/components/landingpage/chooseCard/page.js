"use client"

import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const ChooseCard = () => {
  const { t } = useTranslation();

  return (
    <div className="lg:flex items-center block ">
      <div className="w-full  lg:w-[50%] bg-white p-10">
        <p className="text-4xl font-bold text-headingColor my-6">
        {t("whyChoose")}
        </p>
        <p className="text-headingColor  text-lg mt-20 my-4">
          -   {t("accuracyTrust")}
        </p>
        <p className="text-headingColor  text-lg my-4">
          -  {t("customizationSupport")}
        </p>
        <p className="text-headingColor  text-lg my-4">
          -   {t("dedicatedSupport")}
        </p>
      </div>
      <div className="relative lg:w-[50%] w-full h-full">
        <Image
          width={1000}
          height={1000}
          src="/images/lp4.jpg"
          alt="Analytics Image"
          className="w-full lg:h-[500px] h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white"></div>
      </div>
    </div>
  );
};

export default ChooseCard;
