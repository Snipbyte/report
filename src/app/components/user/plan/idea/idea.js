"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import CustomModal from "../customModal/customModal";

const Idea = ({ goToNext }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] =
    useState("Street trading"); // Default value

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="p-4">
      <p className="text-headingColor mb-4 font-bold text-2xl">
        Describe your idea here.
      </p>
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
              htmlFor="namebrand"
              className="block text-gray-500 text-sm mb-1"
            >
              Project Name / Brand*
            </label>
            <input
              id="namebrand"
              type="text"
              placeholder="Enter Name"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
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
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
          </div>

          {/* Launch Date */}
          <div className="mb-4">
            <label className="block text-gray-500 text-sm mb-1">
              Launch date*
            </label>
            <input
              type="date"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
            />
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
        onClick={goToNext}
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnHover"
      >
        Next
      </button>
    </div>
  );
};

export default Idea;
