"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/app/components/layouts/adminLayout/page";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [modalData, setModalData] = useState(null); // For storing modal data
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Fetch all plans
  const fetchPlans = async () => {
    try {
      const response = await axios.post("/api/admin/plans/getAll");
      setPlans(response.data.data);
      setFilteredPlans(response.data.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setMessage("Failed to fetch plans");
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
      setMessage("Plan deleted successfully.");
      setIsError(false);
      fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
      setMessage("Failed to delete plan");
      setIsError(true);
    }
  };

  // Handle modal open
  const openModal = (plan = null) => {
    setModalData(plan);
    setIsModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setModalData(null);
    setIsModalOpen(false);
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
        });
        setMessage("Plan updated successfully.");
      } else {
        // Add new plan
        await axios.post("/api/admin/plans/create", modalData);
        setMessage("Plan added successfully.");
      }
      setIsError(false);
      fetchPlans();
      closeModal();
    } catch (error) {
      console.error("Error saving plan:", error);
      setMessage("Failed to save plan");
      setIsError(true);
    }
  };

  return (
    <AdminLayout>
      {message && (
        <div
          className={`p-4 mb-4 text-sm rounded ${
            isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Plans</h1>

        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search plans by description or points..."
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
        >
          Add New Plan
        </button>

        {/* Plans Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Title
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Points
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {plan.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {plan.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <ul>
                      {plan.points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => openModal(plan)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit Plan */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">
              {modalData?._id ? "Edit Plan" : "Add New Plan"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Price</label>
                <input
                  type="number"
                  value={modalData?.price || ""}
                  onChange={(e) =>
                    setModalData({ ...modalData, price: e.target.value })
                  }
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={modalData?.description || ""}
                  onChange={(e) =>
                    setModalData({ ...modalData, description: e.target.value })
                  }
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Points (comma saperated)
                </label>
                <textarea
                  value={modalData?.points?.join(", ") || ""}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      points: e.target.value.split(", "),
                    })
                  }
                  className="border p-2 w-full"
                  required
                />
                <p className="text-xs text-indigo-500 my-1">
                  point 1 , point 2
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Plans;
