import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
const PricingCards = (props) => {
  return (
    <div
      className={`my-4  p-10 w-full h-[500px] md:w-[275px]  rounded-lg cursor-pointer mx-2 ${props.isPopular ? "bg-btnColor" : "bg-lightCard"
        }  `}
    >
      <p className="text-headingColor font-light">{props.des}</p>
      <div className="flex items-center gap-1">
        {" "}
        <h2 className="text-headingColor text-3xl font-bold my-2">{props.num}</h2>
        <p className="text-sm text-paraColor">/Month</p>
      </div>
      <p className="text-paraColor text-sm my-3">
        For must buisness that want
        <br /> to optimize web queries
      </p>
      <div className={`flex items-center gap-1 ${props.isPopular ? "text-white" : "text-paraColor"}`}>
        <IoIosCheckmarkCircle className="" />
        <p className=" text-sm font-bold">{props.point1}</p>
      </div>
      <div className={`flex items-center gap-1 my-4 ${props.isPopular ? "text-white" : "text-paraColor"}`}>
        <IoIosCheckmarkCircle className="" />
        <p className=" text-sm font-bold">
          {props.point2}
        </p>
      </div>

      <div className={`flex items-center gap-1 my-4 ${props.isPopular ? "text-white" : "text-paraColor"}`}>
        <IoIosCheckmarkCircle className="" />
        <p className=" text-sm font-bold">{props.point3}</p>
      </div>

      <div className={`flex items-center gap-1 my-4 ${props.isPopular ? "text-white" : "text-paraColor"}`}>
        <IoIosCheckmarkCircle className="" />
        <p className=" text-sm font-bold">{props.point4}</p>
      </div>
      <div className={`flex items-center gap-1 my-4 ${props.isPopular ? "text-white" : "text-paraColor"}`}>
        <IoIosCheckmarkCircle className="" />
        <p className=" text-sm font-bold">{props.point5}</p>
      </div>
      <button
        type="submit"
        class={` text-sm font-medium text-center rounded-lg focus:outline-none focus:ring-primary-300 outline-none  hover:text-white md:w-44 w-full p-2 hover:border-2 hover:border-white ${props.isPopular ? "bg-white text-btnColor hover:bg-hoverBtnColor" : "border-2  bg-transparent  hover:bg-hoverBtnColor text-btnColor border-btnColor "}`}
      >
        Choose Plan
      </button>
    </div>
  );
};

export default PricingCards;
