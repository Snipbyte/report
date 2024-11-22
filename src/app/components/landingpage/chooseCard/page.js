"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getSections } from "@/app/utils/contentManagement/api"; // Make sure to import your API call
import { TbTargetArrow } from "react-icons/tb";

const ChooseCard = () => {
  const { t } = useTranslation();
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch section data for "choose"
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const data = await getSections("choose"); // Fetch data for the "choose" section
        if (data?.sections && data.sections.length > 0) {
          setSectionData(data.sections[0]); // Get the first section from the response
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="lg:flex items-center block my-10">
      <div className="w-full lg:w-[50%] bg-white p-10">
        <p className="text-4xl font-bold text-headingColor my-6">
          {sectionData?.headings[0]?.en || t("whyChoose")}{" "}
          {/* Use the fetched heading or fallback */}
        </p>
        {/* Check if the descriptions are available and render */}
        {sectionData?.descriptions?.map((desc, index) => (
          <div
            key={index}
            className="flex items-center gap-6 bg-white p-3 rounded-md my-4"
          >
            <TbTargetArrow className="w-12 h-12 border border-white p-2" />
            <div
              className="text-headingColor text-md my-4"
              dangerouslySetInnerHTML={{
                __html: desc.en || t(`description${index + 1}`),
              }}
            />
            {/* Removed the <p> tag since dangerouslySetInnerHTML is used */}
          </div>
        ))}
      </div>
      <div className="relative lg:w-[50%] w-full h-full">
        <Image
          width={1000}
          height={1000}
          src={sectionData?.images[0] || "/images/lp4.jpg"} // Fallback image if not available
          alt="Choose Image"
          className="w-full lg:h-[500px] h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white"></div>
      </div>
    </div>
  );
};

export default ChooseCard;
