"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSections } from "@/app/utils/contentManagement/api"; // Assuming you have this API helper

const ContentSection = () => {
  const { t } = useTranslation();
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContentSection = async () => {
      try {
        const data = await getSections("about-page"); // Fetching content from the API
        if (data.sections && data.sections.length > 0) {
          setSectionData(data.sections[0]); // Using the first section from the response
        }
      } catch (error) {
        console.error("Failed to fetch content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContentSection();
  }, []);

  // Fallback default content if the API data is not available
  const defaultData = {
    heading: t("trustedPartner"),
    description: t("empoweringEntrepreneurs"),
    paragraphs: [
      t("foundersChallenges"),
      t("teamOfExperts"),
      t("partnerSupport"),
      t("moveForward"),
    ],
    image: "/images/contentdashboard2.png", // Default image path
    btnText: t("learnMore"),
    btnLink: "/about-us",
  };

  const content = sectionData || defaultData;

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      {/* Heading */}
      <h3 className="lg:text-5xl text-2xl font-bold text-center mt-10 max-w-2xl mx-auto">
        {/* Use the language-specific heading */}
        {content.headings?.find((h) => h.en)
          ? content.headings[0].en
          : content.heading}
      </h3>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 p-10 mt-10">
        {/* Text Content */}
        <div className="w-full">
          <h2 className="text-4xl font-bold">
            {/* Use the language-specific description */}
            {content.description
              ? content.description
              : t("empoweringEntrepreneurs")}
          </h2>

          {/* Render paragraphs if available */}
          {content.paragraphs?.map((paragraph, index) => (
            <p key={index} className="text-md text-paraColor mt-4">
              {paragraph}
            </p>
          ))}

          {/* Button */}
          {content.btnText && content.btnLink && (
            <a
              href={content.btnLink}
              className="inline-block mt-6 bg-btnColor text-white py-2 px-4 rounded-full hover:bg-hoverBtnColor transition-all duration-300"
            >
              {content.btnText}
            </a>
          )}
        </div>

        {/* Image */}
        {content.images && content.images.length > 0 && (
          <div className="flex justify-center lg:w-1/2">
            <Image
              className="w-full max-w-[400px] rounded-md"
              src={content.images[0]} // Using the first image from the response
              width={500}
              height={500}
              alt="Content Section Image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentSection;
