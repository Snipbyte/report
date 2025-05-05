"use client";

import Image from "next/image";
import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const headings = [
  "Idea",
  "Presentation",
  "VisitingCard",
  "Carrier",
  "Offer",
  "Walk",
  "Competitors",
  "Customers",
  "Commercial",
  "CustomerAcquisition",
  "Financials",
];

const PlanSidebar = ({ activeStep, onStepChange }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white text-center px-10">
      <Image
        className="w-24 mx-auto my-4"
        width={1000}
        height={1000}
        src="/images/logo.png"
        alt={t("planSidebar.logoAlt")}
      />
      <div className="text-btnColor flex items-center gap-2 text-2xl justify-center font-bold">
        <FaRegLightbulb />
        <p>{t("planSidebar.planTitle")}</p>
      </div>
      {headings.map((heading) => (
        <div
          key={heading}
          onClick={() => onStepChange(heading)}
          className={`p-2 cursor-pointer my-1
                     ${
                       activeStep === heading
                         ? "font-bold text-btnColor bg-btnColor bg-opacity-20"
                         : "text-paraColor"
                     }`}
        >
          {t(`planSidebar.headings.${heading}`)}
        </div>
      ))}
    </div>
  );
};

export default PlanSidebar;