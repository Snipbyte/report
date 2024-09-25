"use client";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-lightCard p-5">
      <h3 className="text-3xl lg:text-6xl font-bold text-center">
        {t("trustedPartner")}
      </h3>
      <p className="text-lg text-paraColor text-center mt-4 max-w-3xl mx-auto">
        {t("mission")}
      </p>
      <div className="p-5 md:p-10 lg:p-20">
        <Image
          className="w-full rounded-md object-cover h-[400px] md:h-[550px] lg:h-[600px]"
          src="/images/aboutus.jpg"
          width={1000}
          height={1000}
          alt="About Us"
        />
      </div>
    </div>
  );
};

export default HeroSection;
