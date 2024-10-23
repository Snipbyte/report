"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const ChooseSection = () => {
  const { t } = useTranslation();

  // Data for the services
  const services = [
    {
      title: t("sentence34"), 
      description1:t("sentence35"),
      description2: t("sentence36"),
      description3: t("sentence37"),
      link: "/calculator",
    },
    {
        title: t("sentence38"),
        description1: t("sentence39"),
        description2: t("sentence36"),
        description3: t("sentence37"),
        link: "/calculator",
    },
    {
        title: t("sentence42"),
        description1: t("sentence39"),
        description2: t("sentence36"),
        description3: t("sentence37"),
        link: "/calculator",
    },
  ];

  return (
    <div className="lg:flex items-center block my-1 bg-gradient-to-tr from-indigo-950 via-indigo-900 to-violet-950">
      <div className="w-full lg:w-[40%] h-full text-center p-2 text-white">
        <p className="lg:text-5xl text-2xl md:text-4xl font-bold my-6 w-60 mx-auto">
        {t("sentence12")}
        </p>
      </div>
      <div className="w-full lg:w-[60%] bg-lightCard p-10">
        {services.map((service, index) => (
          <div key={index} className="relative lg:h-auto mb-8">
            <p className="text-headingColor font-bold">• {service.title}</p>
            <p className="text-headingColor my-2 text-xs md:text-sm">• {service.description1}</p>
            <p className="text-headingColor my-2 text-xs md:text-sm">• {service.description2}</p>
            <p className="text-headingColor mt-2 mb-12 text-xs md:text-sm">• {service.description3}</p>
            {/* Show link only on large screens */}
            <Link
              href={service.link}
              className="absolute -bottom-12 right-4 hidden lg:flex justify-center w-68 text-center p-4 text-sm hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full"
            >
              {t("startSimulation")}
            </Link>
          </div>
        ))}

        {/* Single link for small screens */}
        <Link
          href="/calculator"
          className="lg:hidden flex justify-center mt-4 lg:p-4 p-2 lg:text-lg text-sm hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full"
        >
          {t("startSimulation")}
        </Link>
      </div>
    </div>
  );
};

export default ChooseSection;
