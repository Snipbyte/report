"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getSections } from "@/app/utils/contentManagement/api";

const ChooseSection = () => {
  const { t } = useTranslation();
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en"); // Default to 'en'

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const data = await getSections("choose-about");
        setSectionData(data?.sections?.[0] || null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching section data:", err);
        setLoading(false);
      }
    };

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    fetchSectionData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Extract content or use defaults
  const heading =
    sectionData?.headings?.find((item) => item[language])?.[language] ||
    t("defaultHeading");
  const descriptions = sectionData?.descriptions?.map(
    (desc) => desc[language]
  ) || [
    t("defaultDescription1"),
    t("defaultDescription2"),
    t("defaultDescription3"),
  ];
  const buttonText =
    sectionData?.buttonTexts?.find((item) => item[language])?.[language] ||
    t("defaultButtonText");

  return (
    <div className="relative bg-lightCard">
      {/* Section Header */}
      <div className="lg:flex items-center block my-10">
        <div className="w-full lg:w-[40%]">
          <p className="lg:text-5xl text-2xl md:text-4xl font-bold text-headingColor my-6 w-60 mx-auto pt-2">
            {heading}
          </p>
        </div>

        {/* Section Content */}
        <div className="w-full lg:w-[60%] bg-lightCard p-10">
          {descriptions.map((desc, index) => (
            <div
              key={index}
              className={`bg-${
                ["blue", "green", "emerald"][index % 3]
              }-100 border-2 border-white p-3 rounded-md my-4`}
            >
              <p
                className="text-headingColor text-md"
                dangerouslySetInnerHTML={{ __html: desc }}
              ></p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-10 mb-8">
        <p className="text-headingColor ml-4 lg:ml-20 lg:mb-6 mb-24">
          {heading}
        </p>
        <Link
          href="/calculator"
          className="absolute bottom-4 lg:left-[800px] left-4 flex justify-center lg:w-60 w-40 text-center lg:p-4 p-2 lg:text-lg text-sm hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default ChooseSection;
