import Link from "next/link";
import React from "react";
import { BsRecordCircleFill } from "react-icons/bs";

const MyPlanCard = () => {
  return (
    <div className="w-full md:w-1/2">
      <p className="text-xl mt-4 text-headingColor">My Plan</p>
      <p className="text-sm text-paraColor my-1 ">
        Change your plan based on your need.
      </p>
      {/* <div className="border w-96 p-2 my-3">
        <div className="flex items-center gap-2">
          <BsRecordCircleFill className="text-hoverBtnColor" />
          <p className="text-headingColor">Pro</p>
          <p className="bg-rose-100 text-btnColor p-1 rounded-sm w-24 text-center text-sm">
            Billed Yearly
          </p>
        </div>
        <div className="mt-2 gap-1 flex items-center">
          <p className="text-headingColor">$299.99 USD</p>
          <p className="text-sm text-paraColor">
            (Next renew 24 September 2023)
          </p>
        </div>
      </div> */}
      <div className="flex text-center gap-5 my-4 items-center">
        <Link
          href="/pricingplan"
          className="bg-lightCard border border-btnColor text-btnColor hover:bg-hoverBtnColor w-32 text-sm rounded-md hover:text-white p-3"
        >
          Explore Plans
        </Link>
        <Link
          href="https://billing.stripe.com/p/login/test_9AQ9Cs3shaRxfew5kk"
          className="bg-btnColor hover:bg-hoverBtnColor w-36 text-sm rounded-md  text-white p-3"
        >
          Payment History
        </Link>
      </div>
    </div>
  );
};

export default MyPlanCard;
