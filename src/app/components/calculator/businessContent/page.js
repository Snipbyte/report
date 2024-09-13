import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const BusinessContent = (props) => {
  return (
    <div className="w-full p-1">
      <div className="flex items-center justify-between cursor-pointer text-headingColor hover:text-hoverBtnColor w-full bg-white shadow-md border hover:border-l-4 duration-500 hover:border-l-hoverBtnColor p-6 rounded-md">
        <Link href="/calculator-detail/calculator">{props.info}</Link>
        <IoIosArrowForward className="w-6 h-6" />
      </div>
    </div>
  );
};

export default BusinessContent;
