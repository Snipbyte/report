"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FaHandPointDown, FaEdit, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

// Dynamically import ReactQuill to ensure it runs only on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

const CustomerAcquisition = ({ goToNext }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actions, setActions] = useState([]);
  const [currentAction, setCurrentAction] = useState({
    id: null,
    name: "",
    description: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId && storedData.planData?.customerAcquisitionActions) {
      setActions(storedData.planData.customerAcquisitionActions[planId] || []);
    }

    const storedToken = localStorage.getItem("token");
    const storedPlanData = JSON.parse(localStorage.getItem("planData"));

    setToken(storedToken);
    setPlanData(storedPlanData);
  }, []);

  const saveActionsToLocalStorage = (newActions) => {
    const storedData = JSON.parse(localStorage.getItem("planData")) || {};
    const planId = localStorage.getItem("planId");

    if (planId) {
      storedData.planData = storedData.planData || {};
      storedData.planData.customerAcquisitionActions =
        storedData.planData.customerAcquisitionActions || {};
      storedData.planData.customerAcquisitionActions[planId] = newActions;
      localStorage.setItem("planData", JSON.stringify(storedData));
    }
  };

  const handleOpenModal = (
    action = { id: null, name: "", description: "" }
  ) => {
    setCurrentAction(action);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveAction = () => {
    if (!currentAction.name || !currentAction.description) {
      alert(t("customerAcquisition.requiredFieldsAlert"));
      return;
    }
    let updatedActions = [];

    if (currentAction.id) {
      updatedActions = actions.map((action) =>
        action.id === currentAction.id ? currentAction : action
      );
    } else {
      updatedActions = [...actions, { ...currentAction, id: Date.now() }];
    }

    setActions(updatedActions);
    saveActionsToLocalStorage(updatedActions);
    setIsModalOpen(false);
    setCurrentAction({ id: null, name: "", description: "" });
  };

  const handleRemoveAction = (id) => {
    const updatedActions = actions.filter((action) => action.id !== id);
    setActions(updatedActions);
    saveActionsToLocalStorage(updatedActions);
  };

  const handleSubmit = async () => {
    setIsPopupOpen(true);
    goToNext();
  };

  const handleClosePopup = () => {
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
      <p className="text-2xl text-headingColor mb-4 font-bold">
        {t("customerAcquisition.title")}
      </p>
      <button
        className="px-4 py-2 bg-btnColor bg-opacity-20 text-btnColor hover:bg-opacity-100 hover:text-white duration-500 rounded hover:bg-btnColor-dark transition"
        onClick={() => handleOpenModal()}
      >
        {t("customerAcquisition.addButton")}
      </button>
      <div className="flex items-center gap-1 my-2">
        <p className="text-paraColor">{t("customerAcquisition.suggestionPrompt")}</p>
        <FaHandPointDown className="text-yellow-500" />
      </div>
      <div className="flex flex-wrap gap-3">
        {suggestions.map((suggestion) => (
          <p
            key={suggestion}
            className="cursor-pointer text-btnColor bg-btnColor bg-opacity-15 w-auto px-3 py-1 rounded-full"
            onClick={() =>
              handleOpenModal({ id: null, name: t(`customerAcquisition.suggestions.${suggestion.replace(/ /g, "_")}`), description: "" })
            }
          >
            {t(`customerAcquisition.suggestions.${suggestion.replace(/ /g, "_")}`)} +
          </p>
        ))}
      </div>

      {actions.length > 0 ? (
        <div className="w-full border my-4">
          {actions.map((action) => (
            <div
              key={action.id}
              className="flex justify-between items-center border-b p-2"
            >
              <div>
                <h3 className="text-lg font-bold">{action.name}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<p class="text-sm text-paraColor">${action.description}</p>`,
                  }}
                />
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
          <p className="text-paraColor text-center mt-1">
            {t("customerAcquisition.noActionsMessage")}
          </p>
          <div className="flex items-center justify-end">
            <Image
              className="w-96 mr-10"
              width={1000}
              height={1000}
              src="/images/customeracquisition.png"
              alt={t("customerAcquisition.imageAlt")}
            />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full lg:w-[80%] p-6">
            <h2 className="text-xl font-bold mb-4">
              {t("customerAcquisition.modalTitle")}
            </h2>
            <div className="my-4">
              <label
                htmlFor="actionname"
                className="block text-gray-500 text-sm mb-1"
              >
                {t("customerAcquisition.nameLabel")}*
              </label>
              <input
                id="actionname"
                type="text"
                value={currentAction.name}
                onChange={(e) =>
                  setCurrentAction({ ...currentAction, name: e.target.value })
                }
                placeholder={t("customerAcquisition.namePlaceholder")}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="description"
                className="block text-gray-500 text-sm mb-1"
              >
                {t("customerAcquisition.descriptionLabel")}*
              </label>
              <ReactQuill
                value={currentAction.description}
                onChange={(value) =>
                  setCurrentAction({ ...currentAction, description: value })
                }
                className="rounded-md"
                placeholder={t("customerAcquisition.descriptionPlaceholder")}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                {t("customerAcquisition.cancelButton")}
              </button>
              <button
                onClick={handleSaveAction}
                className="px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark"
              >
                {t("customerAcquisition.saveButton")}
              </button>
            </div>
          </div>
        </div>
      )}

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold mb-4">
              {t("customerAcquisition.popupTitle")}
            </h2>
            <p className="text-gray-700">
              {t("customerAcquisition.popupMessage")}
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                {t("customerAcquisition.closeButton")}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
        onClick={handleSubmit}
      >
        {t("customerAcquisition.nextButton")}
      </button>
    </div>
  );
};

export default CustomerAcquisition;