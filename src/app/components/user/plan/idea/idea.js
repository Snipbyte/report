"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import CustomModal from "../customModal/customModal";
import { useTranslation } from "react-i18next";

const Idea = ({ goToNext }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] =
    useState("Street trading");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      typeOfActivity: "Street trading",
      projectName: "",
      address: "",
      launchDate: "",
    },
  });

  useEffect(() => {
    // Load data from localStorage
    const loadStoredData = () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("planData")) || {};
        const idea = storedData.planData?.idea; // Access nested idea

        if (idea) {
          const { typeOfActivity, projectName, address, launchDate } = idea;

          // Update form values
          reset({
            typeOfActivity: typeOfActivity || "Street trading",
            projectName: projectName || "",
            address: address || "",
            launchDate: launchDate ? launchDate.split("T")[0] : "",
          });

          // Update selected subcategory
          setSelectedSubcategory(typeOfActivity || "Street trading");
        }
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
      }
    };

    loadStoredData();
  }, [reset]);

  const onSubmit = (data) => {
    try {
      setLoading(true);
      const storedData = JSON.parse(localStorage.getItem("planData")) || {};

      // Update planData with idea
      storedData.planData = {
        ...storedData.planData,
        idea: {
          ...data,
          typeOfActivity: selectedSubcategory,
        },
      };

      // Save to localStorage
      localStorage.setItem("planData", JSON.stringify(storedData));
      console.log("Idea saved in localStorage:", storedData);

      // Proceed to next step
      goToNext();
    } catch (error) {
      console.error("Failed to save idea in localStorage:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="p-4">
      <p className="text-headingColor mb-4 font-bold text-2xl">
        {t("idea.title")}
      </p>

      {loading && <p>{t("idea.loading")}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center">
          <div className="w-full lg:w-[50%] p-2">
            {/* Type of Activity */}
            <div className="border rounded-md p-2 mb-4 flex items-center justify-between">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  {t("idea.typeOfActivityLabel")}
                </label>
                <span className="text-btnColor font-semibold">
                  {selectedSubcategory}
                </span>
              </div>
              <div
                className="cursor-pointer text-btnColor text-xl"
                onClick={handleOpenModal}
              >
                <FaEdit />
              </div>
            </div>

            {/* Project Name */}
            <div className="mb-4">
              <label
                htmlFor="projectName"
                className="block text-gray-500 text-sm mb-1"
              >
                {t("idea.projectNameLabel")}
              </label>
              <input
                id="projectName"
                type="text"
                placeholder={t("idea.projectNamePlaceholder")}
                {...register("projectName", {
                  required: t("idea.projectNameRequired"),
                })}
                className={`w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor ${
                  errors.projectName ? "border-red-500" : ""
                }`}
              />
              {errors.projectName && (
                <p className="text-red-500 text-sm">
                  {errors.projectName.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-500 text-sm mb-1"
              >
                {t("idea.addressLabel")}
              </label>
              <input
                id="address"
                type="text"
                placeholder={t("idea.addressPlaceholder")}
                {...register("address", { required: t("idea.addressRequired") })}
                className={`w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor ${
                  errors.address ? "border-red-500" : ""
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* Launch Date */}
            <div className="mb-4">
              <label className="block text-gray-500 text-sm mb-1">
                {t("idea.launchDateLabel")}
              </label>
              <input
                type="date"
                {...register("launchDate", {
                  required: t("idea.launchDateRequired"),
                })}
                className={`w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor ${
                  errors.launchDate ? "border-red-500" : ""
                }`}
              />
              {errors.launchDate && (
                <p className="text-red-500 text-sm">
                  {errors.launchDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="w-full hidden md:block lg:w-[50%] p-2">
            <Image
              className="w-96 mx-auto my-4"
              width={1000}
              height={1000}
              src="/images/idea.png"
              alt={t("idea.imageAlt")}
            />
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <CustomModal
            onClose={handleCloseModal}
            onSelectSubcategory={(value) => {
              setSelectedSubcategory(value);
              setValue("typeOfActivity", value); // Update form value
              handleCloseModal();
            }}
          />
        )}

        {/* Next Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnHover"
          disabled={loading}
        >
          {t("idea.nextButton")}
        </button>
      </form>
    </div>
  );
};

export default Idea;