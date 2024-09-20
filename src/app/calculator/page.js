"use client";
import React from "react";
import HeroSection from "../components/calculator/heroSection/page";
import Header from "../components/common/header/page";
import Footer from "../components/common/footer/page";
import BusinessCard from "../components/calculator/businessCard/page";
import { useTranslation } from "react-i18next";

const Calculator = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <HeroSection />
      <p className="text-headingColor font-bold text-3xl  p-3">
        {t("smallBsn1")}
      </p>
      <BusinessCard />
      <Footer />
    </div>
  );
};

export default Calculator;
