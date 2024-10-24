import React from "react";
import FormSection from "../components/login/formSection/page";

const Login = () => {
  return (
    <div className="md:flex md:p-20 bg-lightCard">
      <div className="lg:w-1/2 w-full">
        <FormSection />
      </div>
      <div className="hidden lg:w-1/2 lg:flex flex-col justify-center items-center p-10 bg-gray-100 rounded-lg shadow-lg ml-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome Back to Your Business Plan Generator
        </h2>
        <p className="text-gray-600 text-lg">
          Access your personalized business plans or create new ones quickly and
          efficiently. We’re here to support your business journey every step of
          the way.
        </p>
      </div>
    </div>
  );
};

export default Login;
