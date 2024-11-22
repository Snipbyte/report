"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getSections } from "@/app/utils/contentManagement/api"; // Import your API call

const SectionCard = ({ sectionName }) => {
  const { t } = useTranslation();
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en"); // Default to 'en'

  // Fetch the section data for the given sectionName
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const data = await getSections("section"); // Fetch section data based on the sectionName
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
  }, [sectionName]);

  // Extract content from the fetched section data
  const heading = sectionData?.sections[0]?.headings?.find(
    (heading) => heading[language]
  );
  const description = sectionData?.sections[0]?.descriptions?.find(
    (desc) => desc[language]
  );
  const images = sectionData?.sections[0]?.images || [];
  const buttonText = sectionData?.sections[0]?.buttonTexts?.find(
    (btnText) => btnText[language]
  );

  return (
    <div className="lg:flex block items-center my-10">
      <div className="relative lg:w-[50%] w-full h-full">
        <Image
          width={1000}
          height={1000}
          src={images[0] || "/images/lp3.jpg"} // Default to a fallback image if no images are provided
          alt="Section Image"
          className="w-full lg:h-[500px] h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white"></div>
      </div>
      <div className="lg:w-[50%] w-full p-4 bg-white opacity-90">
        {description?.[language] ? (
          <div
            className="text-headingColor w-full md:w-[500px] text-lg my-8"
            dangerouslySetInnerHTML={{
              __html: description?.[language] || "",
            }}
          />
        ) : (
          <>
            <p className="text-headingColor w-full md:w-[500px] text-lg my-8">
              - {t("description4")} {/* Dynamic description if needed */}
            </p>
            <p className="text-headingColor w-full md:w-[500px] text-lg my-8">
              - {t("description5")} {/* Dynamic description if needed */}
            </p>
          </>
        )}

        {buttonText && (
          <a
            href="/"
            className="inline-block mt-4 px-6 py-2 bg-btnColor text-white rounded-full"
          >
            {buttonText[language] || "Default Button Text"}{" "}
            {/* Display button text */}
          </a>
        )}
      </div>
    </div>
  );
};

export default SectionCard;
