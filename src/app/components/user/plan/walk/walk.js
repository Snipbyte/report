"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

const Walk =

 ({ goToNext }) => {
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
      marketDescription: "",
      row1: "",
      row2: "",
      row3: "",
      row4: "",
      row5: "",
    },
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("planData")) || {};
        const planId = storedData.planId;

        if (planId && storedData.planData?.market?.[planId]) {
          const { marketDescription, responses } = storedData.planData.market[planId];
          reset({
            marketDescription: marketDescription || "",
            row1: responses?.row1 || "",
            row2: responses?.row2 || "",
            row3: responses?.row3 || "",
            row4: responses?.row4 || "",
            row5: responses?.row5 || "",
          });
        }
      } catch (error) {
        console.error("Error loading market data from localStorage:", error);
      }
    };

    loadStoredData();
  }, [reset]);

  // Handle form submission
  const onSubmit = (data) => {
    try {
      setLoading(true);
      const storedData = JSON.parse(localStorage.getItem("planData")) || {};
      const planId = storedData.planId;

      if (!planId) {
        console.error("Missing planId");
        return;
      }

      storedData.planData = storedData.planData || {};
      storedData.planData.market = storedData.planData.market || {};
      storedData.planData.market[planId] = {
        marketDescription: data.marketDescription,
        responses: {
          row1: data.row1,
          row2: data.row2,
          row3: data.row3,
          row4: data.row4,
          row5: data.row5,
        },
      };

      localStorage.setItem("planData", JSON.stringify(storedData));
      console.log("Market data saved successfully:", storedData);

      goToNext();
    } catch (error) {
      console.error("Failed to save market data in localStorage:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete action
  const handleDelete = () => {
    try {
      setLoading(true);
      reset({
        marketDescription: "",
        row1: "",
        row2: "",
        row3: "",
        row4: "",
        row5: "",
      });

      const storedData = JSON.parse(localStorage.getItem("planData")) || {};
      const planId = storedData.planId;

      if (planId && storedData.planData?.market) {
        delete storedData.planData.market[planId];
        localStorage.setItem("planData", JSON.stringify(storedData));
        console.log("Market data deleted successfully:", storedData);
      }
    } catch (error) {
      console.error("Failed to delete market data from localStorage:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-headingColor mb-4 font-bold">
        {t("market.title")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-end w-full mt-4 mb-8">
          <div className="w-full lg:w-[60%] space-y-4">
            <p>{t("market.question1")}</p>
            <p>{t("market.question2")}</p>
            <p>{t("market.question3")}</p>
            <p>{t("market.question4")}</p>
            <p>{t("market.question5")}</p>
          </div>
          <div className="flex items-center justify-around w-full lg:w-[40%]">
            <div className="text-center space-y-5">
              <p className="text-headingColor">{t("market.negativeLabel")}</p>
              <input
                type="radio"
                value="Negative"
                {...register("row1")}
              />
              <br />
              <input
                type="radio"
                value="Negative"
                {...register("row2")}
              />
              <br />
              <input
                type="radio"
                value="Negative"
                {...register("row3")}
              />
              <br />
              <input
                type="radio"
                value="Negative"
                {...register("row4")}
              />
              <br />
              <input
                type="radio"
                value="Negative"
                {...register("row5")}
              />
              <br />
            </div>
            <div className="text-center space-y-5">
              <p className="text-headingColor">{t("market.neutralLabel")}</p>
              <input
                type="radio"
                value="Neutral"
                {...register("row1")}
              />
              <br />
              <input
                type="radio"
                value="Neutral"
                {...register("row2")}
              />
              <br />
              <input
                type="radio"
                value="Neutral"
                {...register("row3")}
              />
              <br />
              <input
                type="radio"
                value="Neutral"
                {...register("row4")}
              />
              <br />
              <input
                type="radio"
                value="Neutral"
                {...register("row5")}
              />
              <br />
            </div>
            <div className="text-center space-y-5">
              <p className="text-headingColor">{t("market.positiveLabel")}</p>
              <input
                type="radio"
                value="Positive"
                {...register("row1")}
              />
              <br />
              <input
                type="radio"
                value="Positive"
                {...register("row2")}
              />
              <br />
              <input
                type="radio"
                value="Positive"
                {...register("row3")}
              />
              <br />
              <input
                type="radio"
                value="Positive"
                {...register("row4")}
              />
              <br />
              <input
                type="radio"
                value="Positive"
                {...register("row5")}
              />
              <br />
            </div>
          </div>
        </div>

        <p className="text-paraColor my-2">
          {t("market.descriptionPrompt")}
        </p>
        <Controller
          name="marketDescription"
          control={control}
          rules={{ required: t("market.descriptionRequired") }}
          render={({ field }) => (
            <ReactQuill
              {...field}
              theme="snow"
              className={`w-full mb-4 ${errors.marketDescription ? "border-red-500" : ""}`}
              placeholder={t("market.descriptionPlaceholder")}
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
        {errors.marketDescription && (
          <p className="text-red-500 text-sm">{errors.marketDescription.message}</p>
        )}

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
            disabled={loading}
          >
            {t("market.submitButton")}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
            disabled={loading}
          >
            <FaTrashAlt /> {t("market.deleteButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Walk;