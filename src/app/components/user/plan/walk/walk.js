import React from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";
const Walk = ({ goToNext }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl text-headingColor mb-4 font-bold">What is the trend in your market?</h1>
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
      <input type="radio" name="row1" /><br />
      <input type="radio" name="row2" /><br />
      <input type="radio" name="row3" /><br />
      <input type="radio" name="row4" /><br />
      <input type="radio" name="row5" /><br />
    </div>
    <div className="text-center space-y-5">
      <p className="text-headingColor">Neutral</p>
      <input type="radio" name="row1" /><br />
      <input type="radio" name="row2" /><br />
      <input type="radio" name="row3" /><br />
      <input type="radio" name="row4" /><br />
      <input type="radio" name="row5" /><br />
    </div>
    <div className="text-center space-y-5">
      <p className="text-headingColor">Positive</p>
      <input type="radio" name="row1" /><br />
      <input type="radio" name="row2" /><br />
      <input type="radio" name="row3" /><br />
      <input type="radio" name="row4" /><br />
      <input type="radio" name="row5" /><br />
    </div>
  </div>
</div>

      <p className="text-paraColor my-2">Write below the information you know about the market you are targeting (size, trends, important laws, market studies)</p>
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

export default Walk;