"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const SimulationCard = () => {
  const { t } = useTranslation();

  return (
    <div className="my-10 relative">
      <div className="lg:flex block ">
        <div className="w-full  lg:w-[50%] bg-desColor shadow-2xl p-10">
          <div className="w-14 h-1.5 bg-btnColor mt-10 mb-20"></div>
          <div className="w-80 h-0.5 bg-white"></div>
          <p className="text-white lg:w-96 w-full text-lg mt-20">
            {t("description2")}
          </p>
        </div>
        <div className="relative lg:w-[50%] w-full h-full">
          <Image
            width={1000}
            height={1000}
            src="/images/lp2.jpg"
            alt="Analytics Image"
            className="w-full lg:h-[500px] h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-desColor"></div>
        </div>
      </div>
      <Link
        href="/login"
        className="absolute bottom-10  lg:left-[500px] left-4 flex justify-center w-68 text-center p-4 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full"
      >
        {t("startSimulation")}
      </Link>
    </div>
  );
};

export default SimulationCard;
