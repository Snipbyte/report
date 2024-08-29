import React from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { FaRegCreditCard } from "react-icons/fa6";
const ReportHistoryCard = (props) => {
  return (
    <div className={` w-[250px]  p-6 rounded-lg  ${ props.iscolor ? "bg-orange-100" : "bg-green-100 "

    }`}>
      <div className="flex items-center justify-between">
        <h2 className="font-bold">{props.heading}</h2>
        <FaRegCirclePlay className="text-2xl" />
      </div>
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1 text-sm">
          <GoClock />
          <p>{props.des}</p>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <FaRegCreditCard />
          <p>{props.des2}</p>
        </div>
      </div>
      <div className="mt-1">
        <input type="date" className="text-sm bg-transparent" />
      </div>
      <div className="mt-2">
        <button className={`w-fit  text-sm text-gray-200 px-2 rounded-full ${ props.iscolor ? "bg-orange-500" : "bg-green-500 "

}`} >
          {props.button}
        </button>
      </div>
    </div>
  );
};

export default ReportHistoryCard;
