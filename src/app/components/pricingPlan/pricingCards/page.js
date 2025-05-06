import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Link from "next/link";

const PricingCards = ({
  des = "Default description",
  num = "0",
  planId,
  points = [],
  productlink = "/",
  isPopular = false,
}) => {
  return (
    <div
      className={`my-4 p-10 w-full md:w-[275px] rounded-lg cursor-pointer mx-2 relative overflow-hidden shadow-xl transform transition duration-500 hover:scale-105 ${
        isPopular
          ? "bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500"
          : "bg-indigo-50 border border-indigo-200"
      } animate-slideUp`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-headingColor text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
          Most Popular
        </div>
      )}

      {/* Description */}
      <p
        className={`text-lg font-semibold mb-3 ${
          isPopular ? "text-hoverBtnColor" : "text-gray-800"
        }`}
      >
        {des}
      </p>

      {/* Price */}
      <div className="flex items-center gap-1 mb-4">
        <h2
          className={`text-3xl font-bold ${
            isPopular ? "text-hoverBtnColor" : "text-headingColor"
          }`}
        >
          ${num}
        </h2>
        {isPopular && (
          <p className="text-sm text-paraColor">/Year</p>
        )}
      </div>

      {/* Points Section */}
      <div className="h-[250px] overflow-y-auto custom-scrollbar pr-2">
        {points.map((point, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 my-4 animate-slideIn ${
              isPopular ? "text-btnColor" : "text-paraColor"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <IoIosCheckmarkCircle
              className={`text-xl ${
                isPopular ? "text-btnColor" : "text-cyan-500"
              } flex-shrink-0 transition-transform duration-300 hover:scale-110`}
            />
            <p className="text-sm font-semibold">{point}</p>
          </div>
        ))}
      </div>

      {/* Button */}
      <Link href={`/checkout/${planId}`} passHref>
        <button
          className={`text-sm font-semibold text-center rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 md:w-44 w-full p-2 transition-all duration-300 shadow-md group relative overflow-hidden ${
            isPopular
              ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:shadow-lg"
              : "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          }`}
          aria-label={`Choose ${des} plan`}
        >
          <span className="relative z-10">Choose Plan</span>
          <span
            className={`absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
              isPopular ? "hidden" : ""
            }`}
          ></span>
        </button>
      </Link>
    </div>
  );
};

export default PricingCards;