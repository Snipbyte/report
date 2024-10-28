import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Link from "next/link";

const PricingCards = ({
  des = "Default description",
  num = "0",
  point1 = "Default point 1",
  point2 = "Default point 2",

  productlink = "/",
  isPopular = false,
}) => {
  return (
    <div
      className={`my-4 p-10 w-full h-[500px] md:w-[275px] rounded-lg cursor-pointer mx-2 ${
        isPopular ? "bg-btnColor" : "bg-lightCard"
      }`}
    >
      <p className="text-headingColor font-light">{des}</p>
      <div className="flex items-center gap-1">
        <h2 className="text-headingColor text-3xl font-bold my-2">{num}</h2>
        {isPopular && <p className="text-sm text-paraColor">/Year</p>}
      </div>
     
      {/** Points Section */}
      {[point1, point2].map((point, index) => (
        <div
          key={index}
          className={`flex items-center gap-1 my-4 ${
            isPopular ? "text-white" : "text-paraColor"
          }`}
        >
          <IoIosCheckmarkCircle />
          <p className="text-sm font-bold">{point}</p>
        </div>
      ))}
      {/** Button Section */}
      <button
        type="submit"
        className={`text-sm font-medium text-center rounded-lg focus:outline-none focus:ring-primary-300 outline-none hover:text-white md:w-44 w-full p-2 hover:border-2 hover:border-white ${
          isPopular
            ? "bg-white text-btnColor hover:bg-hoverBtnColor"
            : "border-2 bg-transparent hover:bg-hoverBtnColor text-btnColor border-btnColor"
        }`}
      >
        <Link href={productlink}>Choose Plan</Link>
      </button>
    </div>
  );
};

export default PricingCards;
