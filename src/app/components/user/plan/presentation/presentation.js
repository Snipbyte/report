"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

const Presentation = ({ goToNext }) => {
  const [loading, setLoading] = useState(false);
  const [presentationContent, setPresentationContent] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    control, // Use control for Controller
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Retrieve the plan data from localStorage
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId && storedData.presentation && storedData.presentation[planId]) {
      setPresentationContent(storedData.presentation[planId]);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const planId = localStorage.getItem("planId");

      if (!planId) {
        console.error("Missing planId");
        return;
      }

      setLoading(true);

      // Retrieve existing plan data from localStorage
      const storedData = JSON.parse(localStorage.getItem("planData")) || {};

      // Append or update the presentation content for the current planId
      storedData.presentation = {
        ...storedData.presentation,
        [planId]: data.content,
      };

      // Store the updated plan data in localStorage
      localStorage.setItem("planData", JSON.stringify(storedData));

      console.log("Presentation saved successfully:", storedData);
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
        Prepare project presentation here.
      </p>
      <p className="text-paraColor my-2 text-sm">
        Write a brief summary here that will serve as a hook when you go to see
        your future partners (suppliers, banks, etc.)
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="content"
            control={control} // Control from react-hook-form
            value={presentationContent} // Use value instead of defaultValue
            rules={{ required: "Content is required" }}
            render={({ field }) => (
              <ReactQuill
                {...field}
                theme="snow"
                className="w-full mb-4"
                placeholder="Description"
                value={field.value} // Use the value directly from state
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
            Next
          </button>
        </form>
      )}
    </div>
  );
};

export default Presentation;
