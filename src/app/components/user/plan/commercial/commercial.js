import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

const Commercial = ({ goToNext }) => {
  const [salesPitch, setSalesPitch] = useState(""); // For storing the sales pitch description

  // Load saved sales pitch from localStorage if it exists
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId) {
      // Get the sales pitch from inside planData.salesPitches[planId]
      const savedPitch = storedData.planData?.salesPitches?.[planId] || "";
      setSalesPitch(savedPitch);
    }
  }, []);

  // Function to save the sales pitch to localStorage inside planData
  const saveSalesPitchToLocalStorage = (newPitch) => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId) {
      // Ensure planData exists inside the storedData
      storedData.planData = storedData.planData || {};

      // Ensure salesPitches exists inside planData
      storedData.planData.salesPitches = storedData.planData.salesPitches || {};

      // Save the new sales pitch inside planData.salesPitches[planId]
      storedData.planData.salesPitches[planId] = newPitch;

      // Save the updated storedData back to localStorage
      localStorage.setItem("planData", JSON.stringify(storedData));
    } else {
      console.error("No planId found. Cannot save sales pitch.");
    }
  };

  const handleSalesPitchChange = (value) => {
    setSalesPitch(value);
    saveSalesPitchToLocalStorage(value); // Save the updated sales pitch to localStorage inside planData
  };

  return (
    <div className="p-4">
      <p className="text-headingColor text-2xl font-bold mb-4">
        Your sales pitch
      </p>
      <p className="text-paraColor my-2 text-sm">
        How will you approach your customers? What is your sales strategy? What
        will you tell them?
      </p>
      <ReactQuill
        theme="snow"
        className="w-full mb-4"
        value={salesPitch}
        onChange={handleSalesPitchChange} // Update the sales pitch on change
        placeholder={`Description`}
      />
      <button
        onClick={goToNext}
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
      >
        Next
      </button>
    </div>
  );
};

export default Commercial;
