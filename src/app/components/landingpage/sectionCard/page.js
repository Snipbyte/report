"use client"

import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const SectionCard = () => {
  const { t } = useTranslation();

  return (
    <div className="lg:flex block items-center my-10">
      <div className="relative lg:w-[50%] w-full h-full">
        <Image
          width={1000}
          height={1000}
          src="/images/lp3.jpg"
          alt="Analytics Image"
          className="w-full lg:h-[500px] h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white"></div>
      </div>
      <div className="lg:w-[50%] w-full p-4 bg-white opacity-90">
        {/* <p className='text-4xl font-bold text-headingColor my-6'>Section 1</p> */}
        <p className="text-headingColor w-full md:w-[500px] text-lg my-8">
          {" "}
          {t("description3")}
        </p>
        <p className="text-headingColor w-full md:w-[500px] text-lg my-8">
          - {t("description4")}
        </p>
        <p className="text-headingColor w-full md:w-[500px] text-lg my-8">
          - {t("description5")}
        </p>
      </div>
    </div>
  );
};

export default SectionCard;
