"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
    const { t } = useTranslation();

  return (
    <div className="w-full my-4">
      <h1 className="lg:text-5xl text-3xl font-bold text-headingColor my-2">
      {t("caltxt")}
      </h1>
      <p className="text-paraColor mt-6 mb-10">
      {t("caldes")}
      </p>
    </div>
  );
};

export default HeroSection;
