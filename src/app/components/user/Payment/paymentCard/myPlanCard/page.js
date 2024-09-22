"use client";
import Link from "next/link";
import React from "react";
import { BsRecordCircleFill } from "react-icons/bs";
import { useTranslation } from "react-i18next"; // Import useTranslation

const MyPlanCard = () => {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <div className="w-full md:w-1/2">
      <p className="text-xl mt-4 text-headingColor">{t("myPlan.title")}</p>
      <p className="text-sm text-paraColor my-1 ">{t("myPlan.description")}</p>
      <div className="flex text-center gap-5 my-4 items-center">
        <Link
          href="/pricingplan"
          className="bg-lightCard border border-btnColor text-btnColor hover:bg-hoverBtnColor w-32 text-sm rounded-md hover:text-white p-3"
        >
          {t("myPlan.explorePlans")}
        </Link>
        <Link
          href="https://billing.stripe.com/p/login/test_9AQ9Cs3shaRxfew5kk"
          className="bg-btnColor hover:bg-hoverBtnColor w-36 text-sm rounded-md  text-white p-3"
        >
          {t("myPlan.paymentHistory")}
        </Link>
      </div>
    </div>
  );
};

export default MyPlanCard;
