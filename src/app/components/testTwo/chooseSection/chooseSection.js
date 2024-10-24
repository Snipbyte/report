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

const ChooseSection = () => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-lightCard ">
      <div className="lg:flex items-center block my-10">
        <div className="w-full lg:w-[40%]">
          <p className="lg:text-5xl text-2xl md:text-4xl font-bold text-headingColor my-6 w-60 mx-auto pt-2">
            {t("sentence10")}
          </p>
        </div>
        <div className="w-full  lg:w-[60%]  bg-lightCard  p-10">
          <div className="bg-blue-100 border-2 border-white p-3 rounded-md my-4">
            <p className="text-headingColor  text-md ">{t("sentence5")} </p>
          </div>

          <div className="bg-green-100 border-2 border-white p-3 rounded-md my-4">
            <p className="text-headingColor  text-md">{t("sentence7")}</p>
          </div>

          <div className="bg-emerald-100 border-2 border-white p-3 rounded-md my-4">
            <p className="text-headingColor  text-md ">{t("sentence9")}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-10 mb-8">
        <p className="text-headingColor ml-4 lg:ml-20 lg:mb-6 mb-24">
          {" "}
          {t("sentence10")}
        </p>
        <Link
          href="/calculator"
          className="absolute bottom-4  lg:left-[800px] left-4 flex justify-center lg:w-60 w-40 text-center lg:p-4 p-2 lg:text-lg text-sm hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full"
        >
          {t("startSimulation")}
        </Link>
      </div>
    </div>
  );
};

export default ChooseSection;
