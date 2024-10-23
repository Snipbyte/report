"use client";

import Image from "next/image";
import React from "react";
import { FaTools } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
import { FaPerson } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const WorkSection = () => {
  const { t } = useTranslation();

  return (
    <div className="lg:flex bg-lightCard items-center block my-10">
      <div className="w-full lg:w-[40%]">
        <p className="lg:text-4xl text-xl md:text-2xl font-bold text-headingColor text-center my-6 pt-2">
          {t("howItWorks")}
        </p>
        <p className="lg:text-4xl text-xl md:text-3xl font-bold text-headingColor my-6 w-60 mx-auto">
          {" "}
          {t("sentence21")}
        </p>
      </div>
      <div className="w-full  lg:w-[60%]  bg-lightCard  p-10">
        <div className="border-2 border-orange-500 p-1 rounded-md my-4">
          <p className="text-headingColor text-xs md:text-lg my-2">
            {t("sentence16")}
          </p>
        </div>
        <div className="border-2 border-yellow-500 p-1 rounded-md my-4">
          <p className="text-headingColor text-xs md:text-lg my-2">
            {t("sentence17")}
          </p>
        </div>
        <div className="border-2 border-blue-500 p-1 rounded-md my-4">
          <p className="text-headingColor text-xs md:text-lg my-2">
            {t("sentence18")}
          </p>
        </div>
        <div className="border-2 border-green-500 p-1 rounded-md my-4">
          <p className="text-headingColor text-xs md:text-lg my-2">
            {t("sentence19")}
          </p>
        </div>
        <div className="border-2 border-indigo-500 p-1 rounded-md my-4">
          <p className="text-headingColor text-xs md:text-lg my-2">
            {t("sentence20")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkSection;
