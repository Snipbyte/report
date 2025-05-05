"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";

const Carrier = ({ goToNext }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    businessLeader: "",
    industryExperience: "",
    familySituation: "",
    editorContent: "",
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId && storedData.planData?.carrier?.[planId]) {
      setFormData(storedData.planData.carrier[planId]);
    }
  }, []);

  const updateLocalStorage = (updatedData) => {
    const planId = localStorage.getItem("planId");
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};

    // Check if the planData object and carrier object exist
    if (!storedData.planData) storedData.planData = {};
    if (!storedData.planData.carrier) storedData.planData.carrier = {};

    // Store the updated carrier data in the planData structure
    storedData.planData.carrier[planId] = updatedData;

    // Save the updated planData object back to localStorage
    localStorage.setItem("planData", JSON.stringify(storedData));
  };

  const handleRadioChange = (category, value) => {
    const updatedFormData = { ...formData, [category]: value };
    setFormData(updatedFormData);
    updateLocalStorage(updatedFormData);
  };

  const handleEditorChange = (content) => {
    const updatedFormData = { ...formData, editorContent: content };
    setFormData(updatedFormData);
    updateLocalStorage(updatedFormData);
  };

  return (
    <div className="p-4">
      <p className="text-headingColor font-bold text-2xl">
        {t("carrier.title")}
      </p>

      <div className="md:flex my-6">
        {[
          {
            id: "businessLeader",
            label: t("carrier.businessLeaderLabel"),
            description: t("carrier.businessLeaderDescription"),
          },
          {
            id: "industryExperience",
            label: t("carrier.industryExperienceLabel"),
            description: t("carrier.industryExperienceDescription"),
          },
          {
            id: "familySituation",
            label: t("carrier.familySituationLabel"),
            description: t("carrier.familySituationDescription"),
          },
        ].map(({ id, label, description }) => (
          <div key={id} className="w-full lg:w-[32%] p-1">
            <p className="font-bold">{label}</p>
            <p>{description}</p>
            <div className="flex items-center gap-4 my-2">
              {["yes", "no"].map((option) => (
                <div key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`${id}-${option}`}
                    name={id}
                    value={option}
                    checked={formData[id] === option}
                    onChange={(e) => handleRadioChange(id, e.target.value)}
                  />
                  <label htmlFor={`${id}-${option}`}>
                    {t(`carrier.radioOptions.${option}`)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-paraColor my-2 text-sm">
        {t("carrier.editorDescription")}
      </p>
      <ReactQuill
        theme="snow"
        className="w-full mb-4"
        value={formData.editorContent}
        onChange={handleEditorChange}
        placeholder={t("carrier.editorPlaceholder")}
      />

      <button
        onClick={goToNext}
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
      >
        {t("carrier.nextButton")}
      </button>
    </div>
  );
};

export default Carrier;