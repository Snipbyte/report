"use client";
import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation

const PlanCard = ({ heading, rate, days, btn }) => {
  const { t } = useTranslation(); // Get translation function

  return (
    <div className="bg-white border rounded shadow p-4">
      <h3 className="text-lg font-semibold">{heading}</h3>
      <p>{t('rate')}: {rate}</p>
      <p>{t('days')}: {days}</p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded">
        {btn} {/* Using translation for button text */}
      </button>
    </div>
  );
};

export default PlanCard;
