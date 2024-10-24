import React from "react";
import FormSection from "../components/signUp/formSection/page";

const Signup = () => {
  return (
    <div className="md:flex md:p-20  bg-lightCard ">
      <div className="lg:w-1/2 w-full">
        <FormSection />
      </div>
      <div className="hidden lg:w-1/2 lg:flex flex-col justify-center items-center p-10 bg-gray-100 rounded-lg shadow-lg ml-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to Your Business Plan Generator
        </h2>
        <p className="text-gray-600 text-lg">
          Our platform helps you create custom, professional business plans in
          minutes. Whether you're a startup or an established business, we
          provide the tools to guide your success.
        </p>
      </div>
    </div>
  );
};

export default Signup;
