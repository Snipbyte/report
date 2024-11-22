"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getSections } from "@/app/utils/contentManagement/api"; // Make sure to import your API call

const AmbitionCard = () => {
  const { t } = useTranslation();
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch section data for "ambition"
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const data = await getSections("ambition"); // Fetch data for the "ambition" section
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

 

  return (
    <div className="lg:flex block my-10">
      <div className="w-full lg:w-[50%]">
        <Image
          className="w-full lg:h-[400px] h-full"
          src={sectionData?.images[0] || "/images/lp7.jpg"} // Fallback image if not available
          width={1000}
          height={1000}
          alt="Ambition Image"
        />
      </div>
      <div className="w-full lg:w-[50%] bg-lightCard shadow-2xl p-10">
        <p className="text-headingColor text-3xl my-4">
          {sectionData?.headings[0]?.en || t("tryIziKemp")}
          {/* Use fetched heading or fallback */}
        </p>
        {/* Check if description exists and render */}
        <div
          className="text-headingColor text-lg my-4"
          dangerouslySetInnerHTML={{
            __html:
              sectionData?.descriptions[0]?.en ||  t("tryIziKemp"),
          }}
        />
        <div className="flex justify-center">
          <Link
            href="/calculator"
            className="w-60 text-center p-4 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full my-4"
          >
            {t("startSimulation")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AmbitionCard;
