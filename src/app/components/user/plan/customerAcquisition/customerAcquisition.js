import Image from "next/image";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FaHandPointDown, FaEdit, FaTrash } from "react-icons/fa";
// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

const CustomerAcquisition = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actions, setActions] = useState([]);
  const [currentAction, setCurrentAction] = useState({ id: null, name: "", description: "" });
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup

  const handleOpenModal = (action = { id: null, name: "", description: "" }) => {
    setCurrentAction(action);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveAction = () => {
    if (currentAction.id) {
      // Update existing action
      setActions((prevActions) =>
        prevActions.map((action) =>
          action.id === currentAction.id ? currentAction : action
        )
      );
    } else {
      // Add new action
      setActions((prevActions) => [
        ...prevActions,
        { ...currentAction, id: Date.now() },
      ]);
    }
    setIsModalOpen(false);
    setCurrentAction({ id: null, name: "", description: "" });
  };

  const handleRemoveAction = (id) => {
    setActions((prevActions) => prevActions.filter((action) => action.id !== id));
  };

  const handleSubmit = () => {
    // Show the popup when Submit is clicked
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    // Close the popup
    setIsPopupOpen(false);
  };

  const suggestions = [
    "Google MyBusiness",
    "Distribution of flyers",
    "Website",
    "Article in the local press",
    "Communication agency",
    "Social networks",
    "Taught",
    "Visiting card",
  ];

  return (
    <div className="p-4">
      <p className="text-2xl text-headingColor mb-4 font-bold">Customer Acquisition</p>
      {/* Add product/customer button */}
      <button
        className="px-4 py-2 bg-btnColor bg-opacity-20 text-btnColor hover:bg-opacity-100 hover:text-white duration-500 rounded hover:bg-btnColor-dark transition"
        onClick={() => handleOpenModal()}
      >
        + Add an action
      </button>
      <div className="flex items-center gap-1 my-2">
        <p className="text-paraColor">or select a suggestion:</p>
        <FaHandPointDown className="text-yellow-500" />
      </div>
      <div className="flex flex-wrap gap-3">
        {suggestions.map((suggestion) => (
          <p
            key={suggestion}
            className="cursor-pointer text-btnColor bg-btnColor bg-opacity-15 w-auto px-3 py-1 rounded-full"
            onClick={() =>
              handleOpenModal({ id: null, name: suggestion, description: "" })
            }
          >
            {suggestion} +
          </p>
        ))}
      </div>

      {/* Actions list */}
      {actions.length > 0 ? (
        <div className="w-full border my-4">
          {actions.map((action) => (
            <div
              key={action.id}
              className="flex justify-between items-center border-b p-2"
            >
              <div>
                <h3 className="text-lg font-bold">{action.name}</h3>
                <p className="text-sm text-paraColor">{action.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaEdit
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleOpenModal(action)}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleRemoveAction(action.id)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full border my-4">
          <p className="text-paraColor text-center mt-1">No Action Added</p>
          <div className="flex items-center justify-end">
            <Image
              className="w-96 mr-10"
              width={1000}
              height={1000}
              src="/images/customeracquisition.png"
              alt="idea"
            />
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full lg:w-[80%] p-6">
            <h2 className="text-xl font-bold mb-4">
              Customer Acquisition Action
            </h2>
            <div className="my-4">
              <label
                htmlFor="actionname"
                className="block text-gray-500 text-sm mb-1"
              >
                Action Name*
              </label>
              <input
                id="actionname"
                type="text"
                value={currentAction.name}
                onChange={(e) =>
                  setCurrentAction({ ...currentAction, name: e.target.value })
                }
                placeholder="Write the name of the action"
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
                value={currentAction.description}
                onChange={(value) =>
                  setCurrentAction({ ...currentAction, description: value })
                }
                className="rounded-md"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAction}
                className="px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Action Submitted!</h2>
            <p className="text-gray-700">Your customer acquisition actions have been successfully submitted.</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default CustomerAcquisition;
