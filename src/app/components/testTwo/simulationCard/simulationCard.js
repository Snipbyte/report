"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getSections } from "@/app/utils/contentManagement/api";

const SimulationCard = () => {
  const { t } = useTranslation();
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en"); // Default to 'en'

  // Fetch section data on component mount
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const data = await getSections("simulation-about"); // Fetch data for simulation-about
        console.log("data", data);
        if (data?.sections?.[0]) {
          setSectionData(data.sections[0]); // Set the section data if available
        } else {
          throw new Error("No section data found"); // Handle case if no sections are returned
        }
      } catch (err) {
        setError(true); // Mark as error if fetch fails
        console.error(err);
      } finally {
        setLoading(false);
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

  if (error) {
    // Display the default section when error occurs
    return (
      <div className="my-1 relative">
        <div className="lg:flex block ">
          <div className="w-full lg:h-[500px] lg:w-[50%] bg-desColor shadow-2xl p-10">
            <div className="w-14 h-1.5 bg-btnColor my-2"></div>
            <p className="text-white lg:w-96 w-full lg:text-3xl text-2xl mt-20">
              {t("sentence1")}
            </p>
            <div className="w-80 h-0.5 bg-white my-6"></div>
            <p className="text-white lg:w-96 w-full my-2">{t("sentence2")}</p>
            <p className="text-white lg:w-96 w-full my-2">{t("sentence3")}</p>
            <p className="text-white lg:w-96 w-full my-2">{t("sentence4")}</p>
          </div>
          <div className="relative lg:w-[50%] w-full h-full">
            <Image
              width={1000}
              height={1000}
              src="/images/lp5.jpg"
              alt="Fallback Image"
              className="w-full lg:h-[500px] h-full object-cover opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-desColor"></div>
          </div>
        </div>
        <Link
          href="/login"
          className="absolute bottom-6 lg:left-[500px] left-4 flex justify-center lg:w-60 w-40 text-center lg:p-4 p-2 lg:text-lg text-sm hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full"
        >
          {t("startSimulation")}
        </Link>
      </div>
    );
  }

  // Extract content with fallback values from API response
  const heading =
    sectionData?.headings?.find((item) => item[language])?.[language] ||
    t("defaultHeading");
  const description =
    sectionData?.descriptions?.find((item) => item[language])?.[language] ||
    "<p>" + t("defaultDescription") + "</p>";
  const image = sectionData?.images?.[0] || "/images/lp5.jpg"; // Default image if none is returned
  const buttonText =
    sectionData?.buttonTexts?.find((item) => item[language])?.[language] ||
    t("defaultButtonText");

  return (
    <div className="my-1 relative">
      <div className="lg:flex block">
        {/* Left Section */}
        <div className="w-full lg:h-[500px] lg:w-[50%] bg-desColor shadow-2xl p-10">
          <div className="w-14 h-1.5 bg-btnColor my-2"></div>
          <h2 className="text-white lg:w-96 w-full lg:text-3xl text-2xl mt-20">
            {heading}
          </h2>
          <div className="w-80 h-0.5 bg-white my-6"></div>
          <div
            className="text-white lg:w-96 w-full my-2"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>

        {/* Right Section */}
        <div className="relative lg:w-[50%] w-full h-full">
          <Image
            width={1000}
            height={1000}
            src={image}
            alt="Section Image"
            className="w-full lg:h-[500px] h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-desColor"></div>
        </div>
      </div>

      {/* Button */}
      <Link
        href="/login"
        className="absolute bottom-6 lg:left-[500px] left-4 flex justify-center lg:w-60 w-40 text-center lg:p-4 p-2 lg:text-lg text-sm hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default SimulationCard;
