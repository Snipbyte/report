import Image from "next/image";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // For edit and delete icons

// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

const Customer = ({ goToNext }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customer, setCustomer] = useState(null); // To store the added customer
  const [customerName, setCustomerName] = useState(""); // For customer name input
  const [customerDescription, setCustomerDescription] = useState(""); // For customer description input
  const [selectedRadioType, setSelectedRadioType] = useState(""); // For storing the selected radio type

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId) {
      // Load customer data for the current planId
      const savedCustomers = storedData.customers || {};
      const savedPlanCustomer = savedCustomers[planId] || null;

      setCustomer(savedPlanCustomer);
    }
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleAddCustomer = () => {
    const newCustomer = {
      name: customerName,
      description: customerDescription,
      type: selectedRadioType,
    };
    setCustomer(newCustomer);
    saveCustomerToLocalStorage(newCustomer); // Save customer to localStorage
    toggleModal(); // Close the modal after adding the customer
  };

  const handleEditCustomer = () => {
    setCustomerName(customer.name);
    setCustomerDescription(customer.description);
    setSelectedRadioType(customer.type);
    toggleModal(); // Open modal to edit customer
  };

  const handleDeleteCustomer = () => {
    setCustomer(null); // Clear the customer state
    saveCustomerToLocalStorage(null); // Remove the customer from localStorage
  };

  const handleRadioChange = (e) => {
    setSelectedRadioType(e.target.value);
  };

  const saveCustomerToLocalStorage = (newCustomer) => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId) {
      // Update customer data for the current planId
      storedData.customers = storedData.customers || {};
      if (newCustomer) {
        storedData.customers[planId] = newCustomer;
      } else {
        delete storedData.customers[planId]; // Remove customer for this planId
      }

      localStorage.setItem("planData", JSON.stringify(storedData)); // Save the updated data
    }
  };

  return (
    <div className="p-4">
      <p className="text-2xl text-headingColor mb-4 font-bold">Who are your customers?</p>
      <div className="flex items-center gap-2 my-4">
        <p>Your Customer (Persons)</p>
        {/* Add product/customer button */}
        <button
          onClick={toggleModal}
          className="px-4 py-2 bg-btnColor bg-opacity-20 text-btnColor hover:bg-opacity-100 hover:text-white duration-500 rounded hover:bg-btnColor-dark transition"
        >
          + Add a customer
        </button>
      </div>

      {/* Conditionally hide image if customer is added */}
      {!customer && (
        <div className="w-full border my-4">
          <p className="text-paraColor text-center mt-1">No Customers Added</p>
          <div className="flex items-center justify-end">
            <Image
              className="w-96 mr-10"
              width={1000}
              height={1000}
              src="/images/customer.png"
              alt="idea"
            />
          </div>
        </div>
      )}

      {/* Display customer if added */}
      {customer && (
        <div className="border p-4 mt-4 rounded-md">
          <h3 className="text-lg font-bold">
            {customer.name} ({selectedRadioType})
          </h3>
          <div
            className="customer-description"
            dangerouslySetInnerHTML={{ __html: customer.description }} // Render description HTML
          />
          <div className="flex justify-end gap-4 mt-2">
            <button
              onClick={handleEditCustomer}
              className="text-yellow-500 hover:text-yellow-600"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDeleteCustomer}
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
            <h2 className="text-xl font-bold text-btnColor mb-4">Customer Category (Person)</h2>
            <p className="text-xl font-bold text-headingColor mb-4">Customer Type</p>
            <div className="flex items-center gap-10 my-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="btob"
                  name="business-leader"
                  value="Proffesional - BtoB"
                  checked={selectedRadioType === "Proffesional - BtoB"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="btob">Proffesional - BtoB</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="btoc"
                  name="business-leader"
                  value="Private - BtoC"
                  checked={selectedRadioType === "Private - BtoC"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="btoc">Private - BtoC</label>
              </div>
            </div>
            <div className="my-4">
              <label
                htmlFor="customer"
                className="block text-gray-500 text-sm mb-1"
              >
                Customer Category*
              </label>
              <input
                id="customer"
                type="text"
                placeholder="Give this category a name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
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
                value={customerDescription}
                onChange={setCustomerDescription} // Update description state on change
                placeholder="Write the description of your product/customer"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleAddCustomer}
                className="px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark"
              >
                Save
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

export default Customer;
