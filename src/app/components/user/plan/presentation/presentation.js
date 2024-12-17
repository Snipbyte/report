import React from "react";
import dynamic from "next/dynamic";
// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

const Presentation = ({ goToNext }) => {
  return (
    <div className="p-4">
      <p className="text-headingColor text-2xl font-bold mb-4">Prepare project presentation here.</p>
      <p className="text-paraColor my-2 text-sm">Write a brief summary here that will serve as a hook when you go to see your future partners (suppliers, banks, etc.)</p>
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

export default Presentation;
