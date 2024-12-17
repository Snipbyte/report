import Image from "next/image";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Competitors = ({ goToNext }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [competitors, setCompetitors] = useState([]);
  const [competitorName, setCompetitorName] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const handleOpenModal = () => {
    setCompetitorName("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCompetitor = () => {
    if (competitorName) {
      setCompetitors((prev) => [
        ...prev,
        { name: competitorName, priceStatus: selectedPrice || "aligned" },
      ]);
      setIsModalOpen(false);
    } else {
      alert("Please enter a competitor name!");
    }
  };

  const handlePriceChange = (index, value) => {
    setCompetitors((prev) =>
      prev.map((comp, i) =>
        i === index ? { ...comp, priceStatus: value } : comp
      )
    );
  };

  const handleRemoveCompetitor = (index) => {
    setCompetitors((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <p className="text-2xl text-headingColor mb-4 font-bold">
        Who are your competitors?
      </p>
      {/* Add competitor button */}
      <button
        className="px-4 py-2 bg-btnColor bg-opacity-20 text-btnColor hover:bg-opacity-100 hover:text-white duration-500 rounded hover:bg-btnColor-dark transition"
        onClick={handleOpenModal}
      >
        + Add a competitor
      </button>

      {/* Competitor List */}
      <div className="w-full border my-4">
        {competitors.length > 0 ? (
          competitors.map((competitor, index) => (
            <div key={index} className="flex items-center justify-between gap-2 p-2 border-b">
              <p className="text-paraColor">
                Compared to{" "}
                <span className="font-bold text-btnColor">{competitor.name}</span> I am:
              </p>

              {/* Radio Buttons */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={`price-${index}`}
                    checked={competitor.priceStatus === "cheaper"}
                    onChange={() => handlePriceChange(index, "cheaper")}
                  />
                  Cheaper
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={`price-${index}`}
                    checked={competitor.priceStatus === "aligned"}
                    onChange={() => handlePriceChange(index, "aligned")}
                  />
                  Aligned
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={`price-${index}`}
                    checked={competitor.priceStatus === "more-expensive"}
                    onChange={() => handlePriceChange(index, "more-expensive")}
                  />
                  More Expensive
                </label>
              </div>

              {/* Remove Button */}
              <FaTimes
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => handleRemoveCompetitor(index)}
              />
            </div>
          ))
        ) : (
          <div className="text-center text-paraColor mt-1">
            <p>No Competitors Added</p>
            <div className="flex items-center justify-end">
              <Image
                className="w-96 mr-10"
                width={1000}
                height={1000}
                src="/images/competitors.png"
                alt="Competitors"
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={goToNext}
        className="mt-4 px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark transition"
      >
        Next
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full lg:w-[80%] p-6">
            <h2 className="text-xl font-bold mb-4">Add Competitor</h2>
            <div className="my-4">
              <label
                htmlFor="competitorname"
                className="block text-gray-500 text-sm mb-1"
              >
                Competitor Name*
              </label>
              <input
                id="competitorname"
                type="text"
                value={competitorName}
                onChange={(e) => setCompetitorName(e.target.value)}
                placeholder="Enter competitor name"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-btnColor"
              />
            </div>

            <h2 className="text-xl font-bold my-4">Your Price</h2>
            <div className="flex items-center gap-10 my-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="cheaper"
                  checked={selectedPrice === "cheaper"}
                  onChange={() => setSelectedPrice("cheaper")}
                />
                <label htmlFor="cheaper">Cheaper</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="aligned"
                  checked={selectedPrice === "aligned"}
                  onChange={() => setSelectedPrice("aligned")}
                />
                <label htmlFor="aligned">Aligned</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="moreexpensive"
                  checked={selectedPrice === "more-expensive"}
                  onChange={() => setSelectedPrice("more-expensive")}
                />
                <label htmlFor="moreexpensive">More Expensive</label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCompetitor}
                className="px-4 py-2 bg-btnColor text-white rounded hover:bg-btnColor-dark"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Competitors;
