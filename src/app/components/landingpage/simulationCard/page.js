"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getSections } from "@/app/utils/contentManagement/api"; // Import your API call

const SimulationCard = () => {
  const { t } = useTranslation();
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en"); // Default to 'en'

  // Fetch the section data for simulation on component mount
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const data = await getSections("simulation"); // Change section to 'simulation'
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

  // Determine content based on the language stored in localStorage
  const description = sectionData?.sections[0]?.descriptions?.find(
    (desc) => desc[language]
  );
  const images = sectionData?.sections[0]?.images || [];
  const buttonText = sectionData?.sections[0]?.buttonTexts?.find(
    (btnText) => btnText[language]
  );

  return (
    <div className="my-10 relative">
      <div className="lg:flex block ">
        <div className="w-full lg:w-[50%] bg-desColor shadow-2xl p-10">
          <div className="w-14 h-1.5 bg-btnColor mt-10 mb-20"></div>
          <div className="w-80 h-0.5 bg-white"></div>
          <p className="text-white lg:w-96 w-full text-lg mt-20">
            {description?.[language] || t("description2")}
            {/* Display language-specific description */}
          </p>
        </div>
        <div className="relative lg:w-[50%] w-full h-full">
          <Image
            width={1000}
            height={1000}
            src={images[0] || "/images/lp2.jpg"} // Using the first image or fallback
            alt="Simulation Image"
            className="w-full lg:h-[500px] h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-desColor"></div>
        </div>
      </div>
      <Link
        href="/login"
        className="absolute bottom-10 lg:left-[500px] left-4 flex justify-center w-68 text-center p-4 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full"
      >
        {buttonText?.[language] || t("startSimulation")}{" "}
        {/* Display language-specific button text */}
      </Link>
    </div>
  );
};

export default SimulationCard;
