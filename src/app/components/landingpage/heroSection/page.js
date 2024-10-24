"use client"
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="md:flex block items-center">
      <div className="relative lg:w-[50%] w-full h-full">
        <Image
          width={1000}
          height={1000}
          src="/images/lp1.jpg"
          alt="Analytics Image"
          className="w-full lg:h-[500px] h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent  to-white"></div>
      </div>
      <div className="lg:w-[50%] w-full p-4 bg-white opacity-90">
        <h1 className="lg:text-5xl text-2xl w-full md:w-[500px] font-bold mb-4">
          {t("welcome")}
        </h1>
        <p className="text-lg w-full md:w-[500px]">{t("description")}</p>
      </div>
    </div>
  );
};

export default HeroSection;
