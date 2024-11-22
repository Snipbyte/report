"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaTools } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
import { IoPersonSharp } from "react-icons/io5";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getSections } from "@/app/utils/contentManagement/api"; // Make sure to import your API call

const WorkCard = () => {
  const { t, i18n } = useTranslation();
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch section data
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const data = await getSections("works"); // Fetch data for the specific section
        if (data?.sections && data.sections.length > 0) {
          setSectionData(data);
        } else {
          setSectionData(null); // Set section data to null if no sections found
        }
        setLoading(false);
      } catch (err) {
        setError("Error fetching section data");
        setLoading(false);
        console.error(err);
      }
    };

    fetchSectionData();
  }, []);

  // Log the sectionData to inspect its structure
  useEffect(() => {
    if (sectionData) {
      console.log("Section Data:", sectionData); // Check the structure of the data
    }
  }, [sectionData]);

  // Fallback content when no data or an error occurs
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !sectionData) {
    return (
      <div className="lg:flex bg-lightCard items-center block my-10">
        <div className="w-full lg:w-[50%]">
          <p className="text-4xl font-bold text-headingColor text-center my-6">
            {t("howItWorks")}
          </p>
          <Image
            className="w-full lg:h-[500px] h-full"
            src="/images/lp5.jpg"
            width={1000}
            height={1000}
            alt="Fallback Image"
          />
        </div>
        <div className="w-full lg:w-[50%] bg-lightCard p-10">
          <div className="flex items-center gap-6 bg-blue-200 p-3 rounded-md my-4">
            <FaTools className="w-12 h-12 border border-white p-2" />
            <p className="text-headingColor text-md my-4">
              {t("chooseSimulator")}
            </p>
          </div>
          <div className="flex items-center gap-6 bg-blue-200 p-3 rounded-md my-4">
            <BsGraphUp className="w-12 h-12 border border-white p-2" />
            <p className="text-headingColor text-md my-4">
              {t("enterData")}
            </p>
          </div>
          <div className="flex items-center gap-6 bg-blue-200 p-3 rounded-md my-4">
            <TbTargetArrow className="w-12 h-12 border border-white p-2" />
            <p className="text-headingColor text-md my-4">
              {t("receiveReport")}
            </p>
          </div>
          <div className="flex items-center gap-6 bg-blue-200 p-3 rounded-md my-4">
            <IoPersonSharp className="w-12 h-12 border border-white p-2" />
            <p className="text-headingColor text-md my-4">
              {t("expertConsultation")}
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              href="/about"
              className="w-60 text-center p-4 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full my-4"
            >
              {t("aboutUs")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Extract data for current language (English or French)
  const language = i18n.language; // Get current language ('en' or 'fr')
  const section = sectionData?.sections[0]; // Access the first section
  const description = section?.descriptions.find(desc => desc[language])?.[language] || ""; // Get description in current language
  const buttonText = section?.buttonTexts.find(btn => btn[language])?.[language] || t("aboutUs"); // Get button text in current language

  // Split the description into individual <p> tags
  const paragraphs = description.split("</p>").map((para, index) => {
    if (para) {
      return para + "</p>";
    }
    return null;
  }).filter(Boolean); // Filter out any null values

  return (
    <div className="lg:flex bg-lightCard items-center block my-10">
      <div className="w-full lg:w-[50%]">
        <p className="text-4xl font-bold text-headingColor text-center my-6">
          {section?.headings.find(heading => heading[language])?.[language] || t("howItWorks")}
        </p>
        <Image
          className="w-full lg:h-[500px] h-full"
          src={section?.images[0] || "/images/lp5.jpg"}
          width={1000}
          height={1000}
          alt="Section Image"
        />
      </div>
      <div className="w-full lg:w-[50%] bg-lightCard p-10">
        {/* Render each paragraph with icon and styling */}
        {paragraphs.map((para, index) => (
          <div key={index} className="flex items-center gap-6 bg-blue-200 p-3 rounded-md my-4">
            <TbTargetArrow className="w-12 h-12 border border-white p-2" />
            <p className="text-headingColor text-md my-4" dangerouslySetInnerHTML={{ __html: para }} />
          </div>
        ))}

        <div className="flex justify-center">
          <Link
            href="/about"
            className="w-60 text-center p-4 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full my-4"
          >
            {buttonText} {/* Display the button text */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
