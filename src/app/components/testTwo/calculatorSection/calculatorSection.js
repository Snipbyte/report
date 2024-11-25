"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSections } from "@/app/utils/contentManagement/api";

const CalculatorSection = () => {
  const { t } = useTranslation();
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalculatorSection = async () => {
      try {
        const data = await getSections("calculator-section");
        if (data.sections && data.sections.length > 0) {
          setSectionData(data.sections[0]); // Assume the first section is the relevant one
        }
      } catch (error) {
        console.error("Failed to fetch calculator section data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalculatorSection();
  }, []);

  const defaultData = {
    heading: t("calculators"),
    description: t("bsnDesc"),
    image: "/images/calculators.png",
    link: "/calculator",
    buttonText: t("startSimulation"),
  };

  const content = sectionData || defaultData;

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="mb-10 relative">
      <div className="lg:flex block">
        {/* Left Section */}
        <div className="w-full lg:w-[50%] bg-black shadow-2xl p-10">
          <div className="w-14 h-1.5 bg-btnColor mt-10 mb-20"></div>
          <p className="text-white my-5 text-2xl font-bold">
            {content.heading}
          </p>
          <div className="w-80 h-0.5 bg-white"></div>
          <p className="text-white my-2 text-md lg:text-xl font-medium">
            {content.description}
          </p>
        </div>

        {/* Right Section */}
        <div className="relative lg:w-[50%] w-full h-full">
          <Image
            width={1000}
            height={1000}
            src={content.image}
            alt="Analytics Image"
            className="w-full lg:h-[600px] h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black"></div>
        </div>

        {/* Link/Button */}
        <Link
          href={content.link}
          className="absolute bottom-10 lg:left-[500px] left-4 flex justify-center lg:w-60 w-40 text-center lg:p-4 p-2 lg:text-lg text-sm hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full"
        >
          {content.buttonText}
        </Link>
      </div>
    </div>
  );
};

export default CalculatorSection;
