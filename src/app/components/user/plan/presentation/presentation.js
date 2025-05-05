"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

const Presentation = ({ goToNext }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    // Load data from localStorage
    const loadStoredData = () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("planData")) || {};
        const planId = storedData.planId;

        if (planId && storedData.planData?.presentation?.[planId]) {
          const content = storedData.planData.presentation[planId];
          // Update form with stored content
          reset({ content });
        }
      } catch (error) {
        console.error("Error loading presentation from localStorage:", error);
      }
    };

    loadStoredData();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const storedData = JSON.parse(localStorage.getItem("planData")) || {};
      const planId = storedData.planId;

      if (!planId) {
        console.error("Missing planId");
        return;
      }

      setLoading(true);

      // Update presentation data
      storedData.planData = {
        ...storedData.planData,
        presentation: {
          ...storedData.planData?.presentation,
          [planId]: data.content,
        },
      };

      // Save to localStorage
      localStorage.setItem("planData", JSON.stringify(storedData));
      console.log("Presentation saved successfully:", storedData);

      // Proceed to next step
      goToNext();
    } catch (error) {
      console.error("Failed to save presentation in localStorage:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <p className="text-headingColor text-2xl font-bold mb-4">
        {t("presentation.title")}
      </p>
      <p className="text-paraColor my-2 text-sm">
        {t("presentation.description")}
      </p>
      {loading ? (
        <p>{t("presentation.loading")}</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="content"
            control={control}
            rules={{ required: t("presentation.contentRequired") }}
            render={({ field }) => (
              <ReactQuill
                {...field}
                theme="snow"
                className="w-full mb-4"
                placeholder={t("presentation.contentPlaceholder")}
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
            disabled={loading}
          >
            {t("presentation.nextButton")}
          </button>
        </form>
      )}
    </div>
  );
};

export default Presentation;