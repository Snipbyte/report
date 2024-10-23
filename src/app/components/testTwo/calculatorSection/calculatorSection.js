"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const CalculatorSection = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-10 relative">
      <div className="lg:flex block ">
        <div className="w-full  lg:w-[50%] bg-black shadow-2xl p-10">
          <div className="w-14 h-1.5 bg-btnColor mt-10 mb-20"></div>
          <p className="text-white my-5 text-2xl font-bold ">{t("calculators")} </p>
          <div className="w-80 h-0.5 bg-white"></div>
          <p className="text-white my-2 text-md lg:text-xl font-medium">{t("bsnDesc")}</p>
        </div>
        <div className="relative lg:w-[50%] w-full h-full">
          <Image
            width={1000}
            height={1000}
            src="/images/calculators.png"
            alt="Analytics Image"
            className="w-full lg:h-[600px] h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black"></div>
        </div>
        <Link
          href="/calculator"
          className="absolute bottom-10  lg:left-[500px] left-4 flex justify-center lg:w-60 w-40 text-center lg:p-4 p-2 lg:text-lg text-sm hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full"
        >
          {t("startSimulation")}
        </Link>
      </div>
    </div>
  );
};

export default CalculatorSection;
