"use client";
import Link from "next/link";
import React from "react";
import { BsRecordCircleFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const MyPlanCard = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full md:w-1/2 p-6 bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <BsRecordCircleFill className="text-btnColor w-5 h-5" />
        <h2 className="text-xl font-bold text-headingColor">{t("myPlan.title")}</h2>
      </div>
      <p className="text-sm text-paraColor mb-5">{t("myPlan.description")}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/pricingplan"
          className="flex-1 text-center bg-lightCard text-btnColor font-semibold py-3 px-4 rounded-lg border border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          {t("myPlan.explorePlans")}
        </Link>
        <Link
          href="https://billing.stripe.com/p/login/test_9AQ9Cs3shaRxfew5kk"
          className="flex-1 text-center bg-btnColor text-white font-semibold py-3 px-4 rounded-lg hover:bg-hoverBtnColor focus:outline-none focus:ring-2 focus:ring-btnColor focus:ring-offset-2 transition duration-200"
        >
          {t("myPlan.paymentHistory")}
        </Link>
      </div>
    </div>
  );
};

export default MyPlanCard;