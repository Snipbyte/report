import React from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

const Carrier = ({ goToNext }) => {
  return (
    <div className="p-4">
      <p className="text-headingColor font-bold text-2xl">Plan your career goals here.</p>
      <div className="flex my-6">
  <div className="w-full lg:w-[32%] p-1 text-headingColor">
    <p className="font-bold">Business leader</p>
    <p>I am confident in my skills to run a business</p>
    <div className="flex items-center gap-4 my-2">
      <div className="flex items-center gap-2">
        <input type="radio" id="business-leader-yes" name="business-leader" />
        <label htmlFor="business-leader-yes">Yes</label>
      </div>
      <div className="flex items-center gap-2">
        <input type="radio" id="business-leader-no" name="business-leader" />
        <label htmlFor="business-leader-no">No</label>
      </div>
    </div>
  </div>
  <div className="w-full lg:w-[32%] p-1">
    <p className="font-bold">Industry experience</p>
    <p>I have experience in the profession and contacts</p>
    <div className="flex items-center gap-4 my-2">
      <div className="flex items-center gap-2">
        <input type="radio" id="industry-experience-yes" name="industry-experience" />
        <label htmlFor="industry-experience-yes">Yes</label>
      </div>
      <div className="flex items-center gap-2">
        <input type="radio" id="industry-experience-no" name="industry-experience" />
        <label htmlFor="industry-experience-no">No</label>
      </div>
    </div>
  </div>
  <div className="w-full lg:w-[32%] p-1">
    <p className="font-bold">Family situation</p>
    <p>I have the time, energy, and support of those close to me to cope mentally and financially with failure.</p>
    <div className="flex items-center gap-4 my-2">
      <div className="flex items-center gap-2">
        <input type="radio" id="family-situation-yes" name="family-situation" />
        <label htmlFor="family-situation-yes">Yes</label>
      </div>
      <div className="flex items-center gap-2">
        <input type="radio" id="family-situation-no" name="family-situation" />
        <label htmlFor="family-situation-no">No</label>
      </div>
    </div>
  </div>
</div>

      <p className="text-paraColor my-2 text-sm">Introduce yourself, your team, your key skills, your training</p>
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

export default Carrier;
