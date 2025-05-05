"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

const Offer = ({ goToNext }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [service, setService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      serviceName: "",
      serviceDescription: "",
      businessType: "service",
    },
  });

  // Toggle modal visibility
  const toggleModal = (edit = false) => {
    setIsEditing(edit);
    if (edit && service) {
      reset({
        serviceName: service.name,
        serviceDescription: service.description,
        businessType: "service",
      });
    } else {
      reset({ serviceName: "", serviceDescription: "", businessType: "service" });
    }
    setIsModalOpen(!isModalOpen);
  };

  // Load service data from localStorage on mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("planData")) || {};
        const planId = storedData.planId;

        if (planId && storedData.planData?.services?.[planId]) {
          setService(storedData.planData.services[planId]);
        }
      } catch (error) {
        console.error("Error loading service from localStorage:", error);
      }
    };

    loadStoredData();
  }, []);

  // Handle form submission (add or edit service)
  const onSubmit = (data) => {
    try {
      setLoading(true);
      const newService = {
        name: data.serviceName,
        description: data.serviceDescription,
      };
      setService(newService);

      // Update localStorage
      const storedData = JSON.parse(localStorage.getItem("planData")) || {};
      const planId = storedData.planId;

      if (!planId) {
        console.error("Missing planId");
        return;
      }

      storedData.planData = storedData.planData || {};
      storedData.planData.services = storedData.planData.services || {};
      storedData.planData.services[planId] = newService;

      localStorage.setItem("planData", JSON.stringify(storedData));
      console.log("Service saved successfully:", storedData);

      toggleModal();
    } catch (error) {
      console.error("Failed to save service in localStorage:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting the service
  const handleDeleteService = () => {
    try {
      setService(null);

      const storedData = JSON.parse(localStorage.getItem("planData")) || {};
      const planId = storedData.planId;

      if (planId && storedData.planData?.services) {
        delete storedData.planData.services[planId];
        localStorage.setItem("planData", JSON.stringify(storedData));
        console.log("Service deleted successfully:", storedData);
      }
    } catch (error) {
      console.error("Failed to delete service from localStorage:", error);
    }
  };

  return (
    <div className="p-4">
      <p className="text-2xl text-headingColor mb-4 font-bold">
        {t("offer.title")}
      </p>

      {/* Add product/service button */}
      <button
        onClick={() => toggleModal(false)}
        className="mt-4 px-4 py-2 bg-btnColor bg-opacity-20 text-btnColor hover:bg-opacity-100 hover:text-white duration-500 rounded hover:bg-btnColor-dark transition"
        disabled={loading}
      >
        {t("offer.addButton")}
      </button>
      <br />

      {/* Conditionally hide image if service is added */}
      {!service && (
        <div className="w-full border my-4">
          <p className="text-paraColor text-center mt-1">
            {t("offer.noServiceMessage")}
          </p>
          <div className="flex items-center justify-end">
            <Image
              className="w-96 mr-10"
              width={1000}
              height={1000}
              src="/images/offer.png"
              alt={t("offer.imageAlt")}
            />
          </div>
        </div>
      )}

      {/* Display Service if added */}
      {service && (
        <div className="border p-4 mt-4 rounded-md">
          <h3 className="text-lg font-bold">
            {service.name} ({t("offer.serviceLabel")})
          </h3>
          <div
            className="service-description"
            dangerouslySetInnerHTML={{ __html: service.description }}
          />
          <div className="flex justify-end gap-4 mt-2">
            <button
              onClick={() => toggleModal(true)}
              className="text-yellow-500 hover:text-yellow-600"
              disabled={loading}
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDeleteService}
              className="text-red-500 hover:text-red-600"
              disabled={loading}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      )}

      {/* Next button */}
      <button
        onClick={goToNext}
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
        disabled={loading}
      >
        {t("offer.nextButton")}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full lg:w-[80%]">
            <h2 className="text-xl font-bold text-btnColor mb-4">
              {isEditing ? t("offer.editModalTitle") : t("offer.addModalTitle")}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center gap-4 my-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="service"
                    value="service"
                    {...register("businessType")}
                    defaultChecked
                  />
                  <label htmlFor="service">{t("offer.serviceLabel")}</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="product"
                    value="product"
                    {...register("businessType")}
                  />
                  <label htmlFor="product">{t("offer.productLabel")}</label>
                </div>
              </div>
              <div className="my-4">
                <label
                  htmlFor="serviceName"
                  className="block text-gray-500 text-sm mb-1"
                >
                  {t("offer.serviceNameLabel")}*
                </label>
                <input
                  id="serviceName"
                  type="text"
                  placeholder={t("offer.serviceNamePlaceholder")}
                  {...register("serviceName", {
                    required: t("offer.serviceNameRequired"),
                  })}
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor ${
                    errors.serviceName ? "border-red-500" : ""
                  }`}
                />
                {errors.serviceName && (
                  <p className="text-red-500 text-sm">
                    {errors.serviceName.message}
                  </p>
                )}
              </div>
              <div className="my-4">
                <label
                  htmlFor="serviceDescription"
                  className="block text-gray-500 text-sm mb-1"
                >
                  {t("offer.serviceDescriptionLabel")}*
                </label>
                <Controller
                  name="serviceDescription"
                  control={control}
                  rules={{ required: t("offer.serviceDescriptionRequired") }}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      theme="snow"
                      placeholder={t("offer.serviceDescriptionPlaceholder")}
                      value={field.value || ""}
                      onChange={field.onChange}
                      className={`w-full ${errors.serviceDescription ? "border-red-500" : ""}`}
                    />
                  )}
                />
                {errors.serviceDescription && (
                  <p className="text-red-500 text-sm">
                    {errors.serviceDescription.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark"
                  disabled={loading}
                >
                  {isEditing ? t("offer.updateButton") : t("offer.saveButton")}
                </button>
                <button
                  type="button"
                  onClick={() => toggleModal(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  disabled={loading}
                >
                  {t("offer.closeButton")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;