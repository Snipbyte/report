"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSections } from "@/app/utils/contentManagement/api";

const WorkSection = () => {
  const { t } = useTranslation();
  const [workSteps, setWorkSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkSection = async () => {
      try {
        const data = await getSections("work-section-about");
        if (data.sections && data.sections.length > 0) {
          setWorkSteps(data.sections[0].steps || []); // Dynamically fetched steps
        }
      } catch (error) {
        console.error("Failed to fetch work section data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkSection();
  }, []);

  const defaultSteps = [
    { text: t("sentence16"), borderColor: "border-orange-500" },
    { text: t("sentence17"), borderColor: "border-yellow-500" },
    { text: t("sentence18"), borderColor: "border-blue-500" },
    {
      text: `${t("sentence19")} ${t("sentence20")}`,
      borderColor: "border-green-500",
    },
  ];

  const stepsToRender = workSteps.length > 0 ? workSteps : defaultSteps;

  return (
    <div className="lg:flex bg-lightCard items-center block my-10">
      <div className="w-full lg:w-[40%]">
        <p className="lg:text-4xl text-xl md:text-2xl font-bold text-headingColor text-center my-6 pt-2">
          {t("howItWorks")}
        </p>
        <p className="lg:text-4xl text-xl md:text-3xl font-bold text-headingColor my-6 w-60 mx-auto">
          {t("sentence21")}
        </p>
      </div>
      <div className="w-full lg:w-[60%] bg-lightCard p-10">
        {stepsToRender.map((step, index) => (
          <div
            key={index}
            className={`border-2 ${step.borderColor} p-1 rounded-md my-4`}
          >
            <p className="text-headingColor text-xs md:text-lg my-2">
              {step.text || t(`sentence${16 + index}`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkSection;
