"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getSections } from "@/app/utils/contentManagement/api";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en"); // Default to 'en'

  // Fetch the section data on component mount
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const data = await getSections("landing");
        setSectionData(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching section data");
        setLoading(false);
        console.error(err);
      }
    };

    // Check the language from localStorage
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage); // Set language based on localStorage value
    }

    fetchSectionData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Determine content based on the language stored in localStorage
  const heading = sectionData?.sections[0]?.headings?.find(
    (heading) => heading[language]
  );
  const description = sectionData?.sections[0]?.descriptions?.find(
    (desc) => desc[language]
  );
  const images = sectionData?.sections[0]?.images || [];

  return (
    <div className="md:flex block items-center">
      <div className="relative lg:w-[50%] w-full h-full">
        <Image
          width={1000}
          height={1000}
          src={images[0] || "/images/lp1.jpg"} // Using the first image or fallback
          alt="Analytics Image"
          className="w-full lg:h-[500px] h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white"></div>
      </div>
      <div className="lg:w-[50%] w-full p-4 bg-white opacity-90">
        <h1 className="lg:text-5xl text-2xl w-full md:w-[500px] font-bold mb-4">
          {heading?.[language] || t("welcome")}{" "}
          {/* Display language-specific heading */}
        </h1>
        <p className="text-lg w-full md:w-[500px]">
          {description?.[language] || t("description")}{" "}
          {/* Display language-specific description */}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
