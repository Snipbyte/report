"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const countryCodes = [
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
];

const VisitingCard = ({ goToNext }) => {
  // State for inputs
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]); // Default country
  const [showDropdown, setShowDropdown] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    contact: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
  };

  return (
    <div className="p-4">
      <p className="text-headingColor text-2xl font-bold mb-4">
        Design your visiting card here.
      </p>
      <div className="flex gap-4">
        {/* Input Section */}
        <div className="w-full lg:w-[40%] p-2">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-500 text-sm mb-1"
            >
              First Name*
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-500 text-sm mb-1"
            >
              Last Name*
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-500 text-sm mb-1">
              Title*
            </label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>
           {/* Country Code & Contact Number */}
           <div className="flex items-center border border-gray-300 rounded-md w-full max-w-sm relative mb-4">
            <div
              className="flex items-center bg-lightCard px-2 py-2 rounded-l-md cursor-pointer relative"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="mr-1">{selectedCountry.flag}</span>
              <span className="font-medium">{selectedCountry.code}</span>
              <FaChevronDown className="ml-2 text-gray-500" />
            </div>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute top-full left-0 w-40 bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10">
                {countryCodes.map((country, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectCountry(country)}
                  >
                    <span className="mr-2">{country.flag}</span>
                    <span>{country.code}</span>
                  </div>
                ))}
              </div>
            )}

            <input
              id="contact"
              type="tel"
              placeholder="Enter your contact number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:outline-none rounded-r-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-500 text-sm mb-1"
            >
              Email Address*
            </label>
            <input
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>
        </div>

        {/* Display Section */}
        <div className="w-full lg:w-[60%] p-2 border shadow-md rounded-lg flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-700">
              {formData.firstName || "First Name"}{" "}
              {formData.lastName || "Last Name"}
            </h2>
            <p className="text-lg text-gray-600">{formData.title || "Title"}</p>
            <p className="text-lg text-gray-500">
              {selectedCountry.code} {formData.contact || "Contact"}
            </p>
            <p className="text-lg text-gray-500">{formData.email || "Email"}</p>
          </div>
        </div>
      </div>

      <button
        onClick={goToNext}
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
      >
        Next
      </button>
    </div>
  );
};

export default VisitingCard;
