"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getSections } from "@/app/utils/contentManagement/api"; // Import your API call

const GuaidanceCard = ({ sectionName }) => {
  const { t } = useTranslation();
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en"); // Default to 'en'

  // Fetch section data for the given sectionName
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const data = await getSections("guidance"); // Fetch section data based on the sectionName
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Extract content from the fetched section data
  const heading = sectionData?.sections[0]?.headings?.find(
    (heading) => heading[language]
  );
  const descriptions = sectionData?.sections[0]?.descriptions || [];
  const images = sectionData?.sections[0]?.images || [];

  return (
    <div className="lg:flex block">
      <div className="w-full lg:h-[500px] h-full lg:w-[50%] bg-white p-10">
        <p className="text-4xl font-bold text-headingColor my-2">
          {heading?.[language] || t("heading1")}
        </p>
        <div className="w-full h-1.5 bg-btnColor my-10"></div>
        {/* Map through descriptions if available */}
        {descriptions.length > 0 ? (
          descriptions.map((desc, index) => (
            <div
              key={index}
              className="text-headingColor text-md my-4"
              dangerouslySetInnerHTML={{
                __html: desc[language] || t(`description${index + 6}`),
              }}
            />
          ))
        ) : (
          <>
            <p className="text-headingColor text-md my-4">
              {t("description6")}
            </p>
            <p className="text-headingColor text-md my-4">
              {t("description7")}
            </p>
            <p className="text-headingColor text-md my-4">
              {t("description8")}
            </p>
            <p className="text-headingColor text-md my-4">
              {t("description9")}
            </p>
            <p className="text-headingColor text-md my-4">
              {t("description10")}
            </p>
          </>
        )}
      </div>
      <div className="w-full lg:w-[50%]">
        <Image
          className="w-full lg:h-[500px] h-full"
          src={images[0] || "/images/capture5.jpeg"} // Use default image if no images are provided
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default GuaidanceCard;
