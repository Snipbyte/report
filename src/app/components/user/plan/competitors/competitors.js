"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Competitors = ({ goToNext }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [competitors, setCompetitors] = useState([]);
  const [competitorName, setCompetitorName] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId) {
      // Retrieve the competitors under the planId within the planData object
      const savedCompetitors = storedData.planData?.competitors?.[planId] || [];
      setCompetitors(savedCompetitors);
    }
  }, []);

  const handleOpenModal = () => {
    setCompetitorName("");
    setSelectedPrice("aligned");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCompetitor = () => {
    if (competitorName) {
      const newCompetitor = {
        name: competitorName,
        priceStatus: selectedPrice || "aligned",
      };
      setCompetitors((prev) => {
        const updatedCompetitors = [...prev, newCompetitor];
        saveCompetitorsToLocalStorage(updatedCompetitors);
        return updatedCompetitors;
      });
      setIsModalOpen(false);
    } else {
      alert(t("competitors.nameRequiredAlert"));
    }
  };

  const handlePriceChange = (index, value) => {
    const updatedCompetitors = competitors.map((competitor, i) =>
      i === index ? { ...competitor, priceStatus: value } : competitor
    );
    setCompetitors(updatedCompetitors);
    saveCompetitorsToLocalStorage(updatedCompetitors);
  };

  const handleRemoveCompetitor = (index) => {
    const updatedCompetitors = competitors.filter((_, i) => i !== index);
    setCompetitors(updatedCompetitors);
    saveCompetitorsToLocalStorage(updatedCompetitors);
  };

  // Function to save the competitors to localStorage
  const saveCompetitorsToLocalStorage = (updatedCompetitors) => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId) {
      // Ensure 'planData' exists
      storedData.planData = storedData.planData || {};
      // Ensure 'competitors' exists within 'planData'
      storedData.planData.competitors = storedData.planData.competitors || {};
      // Save the updated competitors under the planId in 'planData'
      storedData.planData.competitors[planId] = updatedCompetitors;
      // Save the updated planData back to localStorage
      localStorage.setItem("planData", JSON.stringify(storedData));
    }
  };

  return (
    <div className="p-4">
      <p className="text-2xl text-headingColor mb-4 font-bold">
        {t("competitors.title")}
      </p>
      <button
        className="px-4 py-2 bg-btnColor bg-opacity-20 text-btnColor hover:bg-opacity-100 hover:text-white duration-500 rounded hover:bg-btnColor-dark transition"
        onClick={handleOpenModal}
      >
        {t("competitors.addButton")}
      </button>

      <div className="w-full border my-4">
        {competitors.length > 0 ? (
          competitors.map((competitor, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 p-2 border-b"
            >
              <p className="text-paraColor">
                {t("competitors.comparisonText")}{" "}
                <span className="font-bold text-btnColor">
                  {competitor.name}
                </span>{" "}
                {t("competitors.comparisonTextEnd")}
              </p>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={`price-${index}`}
                    checked={competitor.priceStatus === "cheaper"}
                    onChange={() => handlePriceChange(index, "cheaper")}
                  />
                  {t("competitors.priceCheaper")}
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={`price-${index}`}
                    checked={competitor.priceStatus === "aligned"}
                    onChange={() => handlePriceChange(index, "aligned")}
                  />
                  {t("competitors.priceAligned")}
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={`price-${index}`}
                    checked={competitor.priceStatus === "more-expensive"}
                    onChange={() => handlePriceChange(index, "more-expensive")}
                  />
                  {t("competitors.priceMoreExpensive")}
                </label>
              </div>

              <FaTimes
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => handleRemoveCompetitor(index)}
              />
            </div>
          ))
        ) : (
          <div className="text-center text-paraColor mt-1">
            <p>{t("competitors.noCompetitorsMessage")}</p>
            <div className="flex items-center justify-end">
              <Image
                className="w-96 mr-10"
                width={1000}
                height={1000}
                src="/images/competitors.png"
                alt={t("competitors.imageAlt")}
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={goToNext}
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
      >
        {t("competitors.nextButton")}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full lg:w-[80%] p-6">
            <h2 className="text-xl font-bold mb-4">
              {t("competitors.modalTitle")}
            </h2>
            <div className="my-4">
              <label
                htmlFor="competitorname"
                className="block text-gray-500 text-sm mb-1"
              >
                {t("competitors.nameLabel")}*
              </label>
              <input
                id="competitorname"
                type="text"
                value={competitorName}
                onChange={(e) => setCompetitorName(e.target.value)}
                placeholder={t("competitors.namePlaceholder")}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
              />
            </div>

            <h2 className="text-xl font-bold my-4">
              {t("competitors.priceTitle")}
            </h2>
            <div className="flex items-center gap-10 my-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="cheaper"
                  checked={selectedPrice === "cheaper"}
                  onChange={() => setSelectedPrice("cheaper")}
                />
                <label htmlFor="cheaper">{t("competitors.priceCheaper")}</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="aligned"
                  checked={selectedPrice === "aligned"}
                  onChange={() => setSelectedPrice("aligned")}
                />
                <label htmlFor="aligned">{t("competitors.priceAligned")}</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="moreexpensive"
                  checked={selectedPrice === "more-expensive"}
                  onChange={() => setSelectedPrice("more-expensive")}
                />
                <label htmlFor="moreexpensive">
                  {t("competitors.priceMoreExpensive")}
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                {t("competitors.cancelButton")}
              </button>
              <button
                onClick={handleSaveCompetitor}
                className="px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark"
              >
                {t("competitors.saveButton")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Competitors;