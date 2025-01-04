"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import CustomModal from "../customModal/customModal";

const Idea = ({ goToNext }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] =
    useState("Street trading"); // Default value
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Get the idea from localStorage, if it exists
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const idea = storedData.idea;

    if (idea) {
      const { typeOfActivity, projectName, address, launchDate } = idea;

      // Set form values from localStorage data
      reset({
        typeOfActivity,
        projectName,
        address,
        launchDate: launchDate ? launchDate.split("T")[0] : "",
      });

      // Set selected subcategory based on type of activity
      setSelectedSubcategory(typeOfActivity || "Street trading");
    }
  }, [reset]);

  const onSubmit = (data) => {
    try {
      const storedData = JSON.parse(localStorage.getItem("planData")) || {};

      // Append the idea data inside the planData
      storedData.planData = {
        ...storedData.planData,
        idea: {
          ...data,
          typeOfActivity: selectedSubcategory,
        },
      };

      // Store the updated plan data in localStorage
      localStorage.setItem("planData", JSON.stringify(storedData));

      console.log("Idea saved in localStorage:", storedData);

      // Proceed to the next step
      goToNext();
    } catch (error) {
      console.error("Failed to save idea in localStorage:", error);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="p-4">
      <p className="text-headingColor mb-4 font-bold text-2xl">
        Describe your idea here.
      </p>

      {loading && <p>Loading...</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center">
          <div className="w-full lg:w-[50%] p-2">
            {/* Type of Activity */}
            <div className="border rounded-md p-2 mb-4 flex items-center justify-between">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Type of activity
                </label>
                <span className="text-btnColor font-semibold">
                  {selectedSubcategory}
                </span>
              </div>
              <div
                className="cursor-pointer text-btnColor text-xl"
                onClick={handleOpenModal}
              >
                <FaEdit />
              </div>
            </div>

            {/* Project Name */}
            <div className="mb-4">
              <label
                htmlFor="projectName"
                className="block text-gray-500 text-sm mb-1"
              >
                Project Name / Brand*
              </label>
              <input
                id="projectName"
                type="text"
                placeholder="Enter Name"
                {...register("projectName", {
                  required: "Project name is required",
                })}
                className={`w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor ${
                  errors.projectName ? "border-red-500" : ""
                }`}
              />
              {errors.projectName && (
                <p className="text-red-500 text-sm">
                  {errors.projectName.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-500 text-sm mb-1"
              >
                Address of the premises*
              </label>
              <input
                id="address"
                type="text"
                placeholder="Enter Address"
                {...register("address", { required: "Address is required" })}
                className={`w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor ${
                  errors.address ? "border-red-500" : ""
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* Launch Date */}
            <div className="mb-4">
              <label className="block text-gray-500 text-sm mb-1">
                Launch date*
              </label>
              <input
                type="date"
                {...register("launchDate", {
                  required: "Launch date is required",
                })}
                className={`w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor ${
                  errors.launchDate ? "border-red-500" : ""
                }`}
              />
              {errors.launchDate && (
                <p className="text-red-500 text-sm">
                  {errors.launchDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-[50%] p-2">
            <Image
              className="w-96 mx-auto my-4"
              width={1000}
              height={1000}
              src="/images/idea.png"
              alt="idea"
            />
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <CustomModal
            onClose={handleCloseModal}
            onSelectSubcategory={setSelectedSubcategory}
          />
        )}

        {/* Next Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnHover"
          disabled={loading}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Idea;
