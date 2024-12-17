import React from "react";

const Partners = ({ goToNext }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Partners</h1>
      <p>Collaborate with your partners here.</p>
      <button
        onClick={goToNext}
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
      >
        Next
      </button>
    </div>
  );
};

export default Partners;
