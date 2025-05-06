"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/app/components/layouts/adminLayout/page";
import { useTranslation } from "react-i18next";
import { FaSearch, FaTimes, FaTrash, FaEdit } from "react-icons/fa";

const AdminPlans = () => {
  const { t } = useTranslation();
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pointInput, setPointInput] = useState("");
  const [editingPointIndex, setEditingPointIndex] = useState(null);

  // Fetch all plans
  const fetchPlans = async () => {
    try {
      const response = await axios.post("/api/admin/plans/getAll");
      setPlans(response.data.data);
      setFilteredPlans(response.data.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setMessage(t("adminPlans.messages.fetch_error"));
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredPlans(
      plans.filter(
        (plan) =>
          plan.description.toLowerCase().includes(value) ||
          plan.points.some((point) => point.toLowerCase().includes(value))
      )
    );
  };

  // Handle plan deletion
  const handleDelete = async (planId) => {
    try {
      await axios.post("/api/admin/plans/delete", { plan_id: planId });
      setMessage(t("adminPlans.messages.delete_success"));
      setIsError(false);
      fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
      setMessage(t("adminPlans.messages.delete_error"));
      setIsError(true);
    }
  };

  // Handle modal open
  const openModal = (plan = null) => {
    setModalData(plan || { price: "", description: "", points: [] });
    setPointInput("");
    setEditingPointIndex(null);
    setIsModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setModalData(null);
    setPointInput("");
    setEditingPointIndex(null);
    setIsModalOpen(false);
  };

  // Handle point input (add on comma, edit if editing)
  const handlePointInput = (e) => {
    const value = e.target.value;
    setPointInput(value);

    if (value.endsWith(",")) {
      const newPoint = value.slice(0, -1).trim();
      if (newPoint) {
        if (editingPointIndex !== null) {
          // Update existing point
          const updatedPoints = [...modalData.points];
          updatedPoints[editingPointIndex] = newPoint;
          setModalData({ ...modalData, points: updatedPoints });
          setEditingPointIndex(null);
        } else {
          // Add new point
          setModalData({
            ...modalData,
            points: [...modalData.points, newPoint],
          });
        }
        setPointInput("");
      }
    }
  };

  // Handle point deletion
  const handleDeletePoint = (index) => {
    const updatedPoints = modalData.points.filter((_, i) => i !== index);
    setModalData({ ...modalData, points: updatedPoints });
  };

  // Handle point editing
  const handleEditPoint = (index) => {
    setPointInput(modalData.points[index]);
    setEditingPointIndex(index);
  };

  // Handle plan submission (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalData?._id) {
        // Edit plan
        await axios.post("/api/admin/plans/update", {
          plan_id: modalData._id,
          price: modalData.price,
          description: modalData.description,
          points: modalData.points,
        });
        setMessage(t("adminPlans.messages.update_success"));
      } else {
        // Add new plan
        await axios.post("/api/admin/plans/create", modalData);
        setMessage(t("adminPlans.messages.add_success"));
      }
      setIsError(false);
      fetchPlans();
      closeModal();
    } catch (error) {
      console.error("Error saving plan:", error);
      setMessage(t("adminPlans.messages.save_error"));
      setIsError(true);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-6 py-8">
        {/* Message Notification */}
        {message && (
          <div
            className={`p-4 mb-6 rounded-lg shadow-md ${
              isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            } animate-fadeIn`}
          >
            {message}
          </div>
        )}

        {/* Title and Description */}
        <h1 className="text-3xl font-bold text-headingColor mb-2">
          {t("adminPlans.title")}
        </h1>
        <p className="text-paraColor mb-6">{t("adminPlans.description")}</p>

        {/* Search Bar and Add Button */}
        <div className="flex flex-col sm:flex-row mb-6">
          <div className="flex items-center w-full border border-gray-300 p-2.5 bg-white transition-all duration-300">
            <FaSearch className="text-paraColor mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder={t("adminPlans.search_placeholder")}
              className="w-full outline-none text-headingColor"
            />
          </div>
          <button
            onClick={() => openModal()}
            className="bg-btnColor w-full sm:w-64 text-white py-2 px-4 hover:bg-hoverBtnColor transition duration-300"
          >
            {t("adminPlans.add_button")}
          </button>
        </div>

        {/* Plans Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-headingColor">
                    {t("adminPlans.table_headers.price")}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-headingColor">
                    {t("adminPlans.table_headers.title")}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-headingColor">
                    {t("adminPlans.table_headers.points")}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-headingColor">
                    {t("adminPlans.table_headers.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPlans.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-paraColor"
                    >
                      No plans found.
                    </td>
                  </tr>
                ) : (
                  filteredPlans.map((plan) => (
                    <tr
                      key={plan._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 border-t border-gray-200 text-headingColor">
                        ${plan.price}
                      </td>
                      <td className="px-6 py-4 border-t border-gray-200 text-headingColor">
                        {plan.description}
                      </td>
                      <td className="px-6 py-4 border-t border-gray-200 text-headingColor">
                        <ul className="list-disc pl-5">
                          {plan.points.map((point, index) => (
                            <li key={index} className="text-sm">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 border-t border-gray-200">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal(plan)}
                            className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition duration-300 shadow-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(plan._id)}
                            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300 shadow-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Add/Edit Plan */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-300">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  {modalData?._id
                    ? t("adminPlans.modal.edit_title")
                    : t("adminPlans.modal.add_title")}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-gray-200 transition duration-300"
                  aria-label={t("adminPlans.modal.cancel_button")}
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-headingColor">
                    {t("adminPlans.modal.price_label")}
                  </label>
                  <input
                    type="number"
                    value={modalData?.price || ""}
                    onChange={(e) =>
                      setModalData({ ...modalData, price: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-btnColor transition duration-300"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-headingColor">
                    {t("adminPlans.modal.title_label")}
                  </label>
                  <input
                    type="text"
                    value={modalData?.description || ""}
                    onChange={(e) =>
                      setModalData({ ...modalData, description: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-btnColor transition duration-300"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-headingColor">
                    {t("adminPlans.modal.points_label")}
                  </label>
                  <input
                    type="text"
                    value={pointInput}
                    onChange={handlePointInput}
                    placeholder={
                      editingPointIndex !== null
                        ? t("adminPlans.modal.points_edit_placeholder")
                        : t("adminPlans.modal.points_add_placeholder")
                    }
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-btnColor transition duration-300"
                    aria-describedby="points-hint"
                  />
                  <p id="points-hint" className="text-xs text-btnColor mt-1">
                    {t("adminPlans.modal.points_hint")}
                  </p>
                  {/* Points List */}
                  {modalData?.points?.length > 0 && (
                    <div className="mt-3 max-h-20 overflow-y-auto custom-scrollbar pr-2">
                      {modalData.points.map((point, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded-md mb-2 animate-slideIn"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <span className="text-sm text-headingColor">{point}</span>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditPoint(index)}
                              className="text-btnColor hover:text-indigo-700 transition duration-300"
                              aria-label={`${t("adminPlans.modal.edit_title")} point: ${point}`}
                            >
                              <FaEdit className="text-sm" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeletePoint(index)}
                              className="text-red-500 hover:text-red-700 transition duration-300"
                              aria-label={`${t("adminPlans.table_headers.actions")} delete point: ${point}`}
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-paraColor text-white py-2 px-5 rounded-lg hover:bg-gray-500 transition duration-300 shadow-sm"
                  >
                    {t("adminPlans.modal.cancel_button")}
                  </button>
                  <button
                    type="submit"
                    className="bg-btnColor text-white py-2 px-5 rounded-lg hover:bg-hoverBtnColor transition duration-300 shadow-sm"
                  >
                    {t("adminPlans.modal.save_button")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPlans;