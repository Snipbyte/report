import Image from "next/image";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // For edit and delete icons
// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";
const Offer = ({ goToNext }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [service, setService] = useState(null); // To store the added service
  const [serviceName, setServiceName] = useState(""); // For service name input
  const [serviceDescription, setServiceDescription] = useState(""); // For service description input

  // Function to toggle modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Function to handle adding the service
  const handleAddService = () => {
    setService({
      name: serviceName,
      description: serviceDescription,
    });
    toggleModal(); // Close the modal after adding the service
  };

  // Function to handle editing the service
  const handleEditService = () => {
    setServiceName(service.name);
    setServiceDescription(service.description);
    toggleModal(); // Open modal to edit service
  };

  // Function to handle deleting the service
  const handleDeleteService = () => {
    setService(null); // Clear the service state
  };

  return (
    <div className="p-4">
      <p className="text-2xl text-headingColor mb-4 font-bold">Add your first product/service</p>

      {/* Add product/service button */}
      <button
        onClick={toggleModal}
        className="mt-4 px-4 py-2 bg-btnColor bg-opacity-20 text-btnColor hover:bg-opacity-100 hover:text-white duration-500 rounded hover:bg-btnColor-dark transition"
      >
        + Add product/service
      </button>
      <br />

      {/* Conditionally hide image if service is added */}
      {!service && (
        <div className="w-full border my-4">
          <p className="text-paraColor text-center mt-1">No Product/Service Added</p>
          <div className="flex items-center justify-end">
            <Image
              className="w-96 mr-10"
              width={1000}
              height={1000}
              src="/images/offer.png"
              alt="idea"
            />
          </div>
        </div>
      )}

      {/* Display Service if added */}
      {service && (
        <div className="border p-4 mt-4 rounded-md">
          <h3 className="text-lg font-bold">
            {service.name} (Service)
          </h3>
          <div
            className="service-description"
            dangerouslySetInnerHTML={{ __html: service.description }} // Render description HTML
          />
          <div className="flex justify-end gap-4 mt-2">
            <button
              onClick={handleEditService}
              className="text-yellow-500 hover:text-yellow-600"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDeleteService}
              className="text-red-500 hover:text-red-600"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      )}

      {/* Next button */}
      <button
        onClick={goToNext}
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
      >
        Next
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full lg:w-[80%]">
            <h2 className="text-xl font-bold text-btnColor mb-4">Product/Service</h2>
            <div className="flex items-center gap-4 my-2">
              <div className="flex items-center gap-2">
                <input type="radio" id="service" name="business-leader" />
                <label htmlFor="service">Service</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" id="product" name="business-leader" />
                <label htmlFor="product">Product</label>
              </div>
            </div>
            <div className="my-4">
              <label
                htmlFor="service"
                className="block text-gray-500 text-sm mb-1"
              >
                Service*
              </label>
              <input
                id="service"
                type="text"
                placeholder="Write the name of your product/service"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="description"
                className="block text-gray-500 text-sm mb-1"
              >
                Description*
              </label>
              <ReactQuill
                value={serviceDescription}
                onChange={setServiceDescription} // Update description state on change
                placeholder="Write the description of your product/service"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleAddService}
                className="px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark"
              >
                Save Service
              </button>
              {/* Close button */}
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
