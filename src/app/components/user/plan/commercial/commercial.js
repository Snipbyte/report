"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

const Commercial = ({ goToNext }) => {
  const { t } = useTranslation();
  const [salesPitch, setSalesPitch] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId) {
      const savedPitch = storedData.planData?.salesPitches?.[planId] || "";
      setSalesPitch(savedPitch);
    }
  }, []);

  const saveSalesPitchToLocalStorage = (newPitch) => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId) {
      storedData.planData = storedData.planData || {};
      storedData.planData.salesPitches = storedData.planData.salesPitches || {};
      storedData.planData.salesPitches[planId] = newPitch;
      localStorage.setItem("planData", JSON.stringify(storedData));
    } else {
      console.error("No planId found. Cannot save sales pitch.");
    }
  };

  const handleSalesPitchChange = (value) => {
    setSalesPitch(value);
    saveSalesPitchToLocalStorage(value);
  };

  return (
    <div className="p-4">
      <p className="text-headingColor text-2xl font-bold mb-4">
        {t("commercial.title")}
      </p>
      <p className="text-paraColor my-2 text-sm">
        {t("commercial.descriptionPrompt")}
      </p>
      <ReactQuill
        theme="snow"
        className="w-full mb-4"
        value={salesPitch}
        onChange={handleSalesPitchChange}
        placeholder={t("commercial.placeholder")}
      />
      <button
        onClick={goToNext}
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
      >
        {t("commercial.nextButton")}
      </button>
    </div>
  );
};

export default Commercial;