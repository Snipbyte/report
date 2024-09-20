"use client";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-lightCard p-5">
      <h3 className="lg:text-6xl text-3xl font-bold text-center ">
        {t("trustedPartner")}
      
      </h3>
      <p className="text-lg text-paraColor text-center mt-4 w-[900px] mx-auto">
      
        {t("mission")}
      </p>
      <div className="p-20">
        <Image
          className="w-full rounded-md h-[550px] "
          src="/images/aboutus.jpg"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default HeroSection;
