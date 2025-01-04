import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

const Walk = ({ goToNext }) => {
  const [marketDescription, setMarketDescription] = useState(""); // To store market description
  const [responses, setResponses] = useState({
    row1: "",
    row2: "",
    row3: "",
    row4: "",
    row5: "",
  });

  // Function to handle radio button selection
  const handleRadioChange = (row, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [row]: value,
    }));
  };

  // Save data to localStorage when component mounts or when state changes
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId) {
      // Check if there's existing data for the current planId
      const savedMarketData = storedData.market || {};
      const savedResponses = savedMarketData[planId] || {};

      setMarketDescription(savedResponses.marketDescription || "");
      setResponses(
        savedResponses.responses || {
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
        }
      );
    }
  }, []);

// Function to handle saving the form data
const handleSaveData = () => {
  const storedData = JSON.parse(localStorage.getItem("planData")) || {};
  const planId = localStorage.getItem("planId");

  if (planId) {
    // Ensure the market data exists within the planData
    storedData.planData = storedData.planData || {}; // Ensure planData exists
    storedData.planData.market = storedData.planData.market || {}; // Ensure market exists under planData
    storedData.planData.market[planId] = {
      marketDescription,
      responses,
    };

    // Store the updated data in localStorage
    localStorage.setItem("planData", JSON.stringify(storedData));
  }
};

  return (
    <div className="p-4">
      <h1 className="text-2xl text-headingColor mb-4 font-bold">
        What is the trend in your market?
      </h1>
      <div className="flex items-end w-full mt-4 mb-8">
        <div className="w-full lg:w-[60%] space-y-4">
          <p>Is the economic demand for this product increasing?</p>
          <p>How do societal developments impact your sales?</p>
          <p>How does technology impact your offering?</p>
          <p>What is the impact of your industry on the environment?</p>
          <p>How do regulations impact your project?</p>
        </div>
        <div className="flex items-center justify-around w-full lg:w-[40%]">
          <div className="text-center space-y-5">
            <p className="text-headingColor">Negative</p>
            <input
              type="radio"
              name="row1"
              checked={responses.row1 === "Negative"}
              onChange={() => handleRadioChange("row1", "Negative")}
            />
            <br />
            <input
              type="radio"
              name="row2"
              checked={responses.row2 === "Negative"}
              onChange={() => handleRadioChange("row2", "Negative")}
            />
            <br />
            <input
              type="radio"
              name="row3"
              checked={responses.row3 === "Negative"}
              onChange={() => handleRadioChange("row3", "Negative")}
            />
            <br />
            <input
              type="radio"
              name="row4"
              checked={responses.row4 === "Negative"}
              onChange={() => handleRadioChange("row4", "Negative")}
            />
            <br />
            <input
              type="radio"
              name="row5"
              checked={responses.row5 === "Negative"}
              onChange={() => handleRadioChange("row5", "Negative")}
            />
            <br />
          </div>
          <div className="text-center space-y-5">
            <p className="text-headingColor">Neutral</p>
            <input
              type="radio"
              name="row1"
              checked={responses.row1 === "Neutral"}
              onChange={() => handleRadioChange("row1", "Neutral")}
            />
            <br />
            <input
              type="radio"
              name="row2"
              checked={responses.row2 === "Neutral"}
              onChange={() => handleRadioChange("row2", "Neutral")}
            />
            <br />
            <input
              type="radio"
              name="row3"
              checked={responses.row3 === "Neutral"}
              onChange={() => handleRadioChange("row3", "Neutral")}
            />
            <br />
            <input
              type="radio"
              name="row4"
              checked={responses.row4 === "Neutral"}
              onChange={() => handleRadioChange("row4", "Neutral")}
            />
            <br />
            <input
              type="radio"
              name="row5"
              checked={responses.row5 === "Neutral"}
              onChange={() => handleRadioChange("row5", "Neutral")}
            />
            <br />
          </div>
          <div className="text-center space-y-5">
            <p className="text-headingColor">Positive</p>
            <input
              type="radio"
              name="row1"
              checked={responses.row1 === "Positive"}
              onChange={() => handleRadioChange("row1", "Positive")}
            />
            <br />
            <input
              type="radio"
              name="row2"
              checked={responses.row2 === "Positive"}
              onChange={() => handleRadioChange("row2", "Positive")}
            />
            <br />
            <input
              type="radio"
              name="row3"
              checked={responses.row3 === "Positive"}
              onChange={() => handleRadioChange("row3", "Positive")}
            />
            <br />
            <input
              type="radio"
              name="row4"
              checked={responses.row4 === "Positive"}
              onChange={() => handleRadioChange("row4", "Positive")}
            />
            <br />
            <input
              type="radio"
              name="row5"
              checked={responses.row5 === "Positive"}
              onChange={() => handleRadioChange("row5", "Positive")}
            />
            <br />
          </div>
        </div>
      </div>

      <p className="text-paraColor my-2">
        Write below the information you know about the market you are targeting
        (size, trends, important laws, market studies)
      </p>
      <ReactQuill
        theme="snow"
        className="w-full mb-4"
        placeholder={`Description`}
        value={marketDescription}
        onChange={setMarketDescription}
      />

      <button
        onClick={() => {
          handleSaveData();
          goToNext();
        }}
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
      >
        Next
      </button>
    </div>
  );
};

export default Walk;
