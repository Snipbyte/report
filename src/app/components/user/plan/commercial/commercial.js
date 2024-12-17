import React from "react";
import dynamic from "next/dynamic";
// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

const Commercial = ({ goToNext }) => {
  return (
    <div className="p-4">
      <p className="text-headingColor text-2xl font-bold mb-4">Your sales pitch</p>
      <p className="text-paraColor my-2 text-sm">How will you approach your customers? What is your sales strategy? What will you tell them?</p>
      <ReactQuill
        theme="snow"
        className="w-full mb-4"
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
