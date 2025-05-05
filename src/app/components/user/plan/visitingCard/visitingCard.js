"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const countryCodes = [
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
];

const VisitingCard = ({ goToNext }) => {
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      contact: "",
      selectedCountry: countryCodes[0],
    },
  });

  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const formData = watch();

  useEffect(() => {
    // Load data from localStorage
    const loadStoredData = () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("planData")) || {};
        const planId = storedData.planId;

        if (planId && storedData.planData?.visitingCard?.[planId]) {
          const visitingCard = storedData.planData.visitingCard[planId];
          // Update form with stored data
          reset({
            firstName: visitingCard.firstName || "",
            lastName: visitingCard.lastName || "",
            title: visitingCard.title || "",
            email: visitingCard.email || "",
            contact: visitingCard.contact || "",
            selectedCountry: visitingCard.selectedCountry || countryCodes[0],
          });
          // Update selected country state
          setSelectedCountry(visitingCard.selectedCountry || countryCodes[0]);
        }
      } catch (error) {
        console.error("Error loading visiting card from localStorage:", error);
      }
    };

    loadStoredData();
  }, [reset]);

  const handleSelectCountry = (country, field) => {
    setSelectedCountry(country);
    field.onChange(country); // Update form state
    setShowDropdown(false);
  };

  const onSubmit = (data) => {
    try {
      const storedData = JSON.parse(localStorage.getItem("planData")) || {};
      const planId = storedData.planId;

      if (!planId) {
        console.error("Missing planId");
        return;
      }

      setLoading(true);

      // Update visiting card data
      storedData.planData = {
        ...storedData.planData,
        visitingCard: {
          ...storedData.planData?.visitingCard,
          [planId]: {
            ...data,
            selectedCountry: data.selectedCountry,
          },
        },
      };

      // Save to localStorage
      localStorage.setItem("planData", JSON.stringify(storedData));
      console.log("Visiting card saved successfully:", storedData);

      // Proceed to next step
      goToNext();
    } catch (error) {
      console.error("Failed to save visiting card in localStorage:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <p className="text-headingColor text-2xl font-bold mb-4">
        {t("visitingCard.title")}
      </p>
      {loading ? (
        <p>{t("visitingCard.loading")}</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex gap-4">
            {/* Input Section */}
            <div className="w-full lg:w-[40%] p-2">
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-gray-500 text-sm mb-1"
                >
                  {t("visitingCard.firstNameLabel")}*
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder={t("visitingCard.firstNamePlaceholder")}
                  {...register("firstName", {
                    required: t("visitingCard.firstNameRequired"),
                  })}
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-500 text-sm mb-1"
                >
                  {t("visitingCard.lastNameLabel")}*
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder={t("visitingCard.lastNamePlaceholder")}
                  {...register("lastName", {
                    required: t("visitingCard.lastNameRequired"),
                  })}
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-500 text-sm mb-1"
                >
                  {t("visitingCard.titleLabel")}*
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder={t("visitingCard.titlePlaceholder")}
                  {...register("title", {
                    required: t("visitingCard.titleRequired"),
                  })}
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact"
                  className="block text-gray-500 text-sm mb-1"
                >
                  {t("visitingCard.contactLabel")}*
                </label>
                <div className="flex items-center border border-gray-300 rounded-md w-full max-w-sm relative">
                  <Controller
                    name="selectedCountry"
                    control={control}
                    rules={{ required: t("visitingCard.countryCodeRequired") }}
                    render={({ field }) => (
                      <div className="relative">
                        <div
                          className="flex items-center bg-lightCard px-2 py-2 rounded-l-md cursor-pointer"
                          onClick={() => setShowDropdown(!showDropdown)}
                        >
                          <span className="mr-1">{selectedCountry.flag}</span>
                          <span className="font-medium">
                            {selectedCountry.code}
                          </span>
                          <FaChevronDown className="ml-2 text-gray-500" />
                        </div>
                        {showDropdown && (
                          <div className="absolute top-full left-0 w-40 bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10">
                            {countryCodes.map((country, index) => (
                              <div
                                key={index}
                                className="flex items-center px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleSelectCountry(country, field)}
                              >
                                <span className="mr-2">{country.flag}</span>
                                <span>{country.code}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  />
                  <input
                    id="contact"
                    type="tel"
                    placeholder={t("visitingCard.contactPlaceholder")}
                    {...register("contact", {
                      required: t("visitingCard.contactRequired"),
                    })}
                    className={`w-full px-3 py-2 focus:outline-none rounded-r-md ${
                      errors.contact ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.selectedCountry && (
                  <p className="text-red-500 text-sm">
                    {errors.selectedCountry.message}
                  </p>
                )}
                {errors.contact && (
                  <p className="text-red-500 text-sm">
                    {errors.contact.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-500 text-sm mb-1"
                >
                  {t("visitingCard.emailLabel")}*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder={t("visitingCard.emailPlaceholder")}
                  {...register("email", {
                    required: t("visitingCard.emailRequired"),
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: t("visitingCard.emailInvalid"),
                    },
                  })}
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="w-full lg:w-[60%] p-2 border shadow-md rounded-lg flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-700">
                  {formData.firstName || t("visitingCard.firstNamePlaceholder")}{" "}
                  {formData.lastName || t("visitingCard.lastNamePlaceholder")}
                </h2>
                <p className="text-lg text-gray-600">
                  {formData.title || t("visitingCard.titlePlaceholder")}
                </p>
                <p className="text-lg text-gray-500">
                  {selectedCountry.code}{" "}
                  {formData.contact || t("visitingCard.contactPlaceholder")}
                </p>
                <p className="text-lg text-gray-500">
                  {formData.email || t("visitingCard.emailPlaceholder")}
                </p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
            disabled={loading}
          >
            {t("visitingCard.submitButton")}
          </button>
        </form>
      )}
    </div>
  );
};

export default VisitingCard;