"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const ChooseSection = () => {
  const { t } = useTranslation();

  // Data for the services
  const services = [
    {
      title: "Financing Simulators",
      description1: "At IziKemp, we offer a comprehensive range of simulators tailored to precisely meet your financial needs. Whether you're considering a bank loan...",
      description2: "Speed and Efficiency: Obtain your results instantly to make informed decisions.",
      description3: "Personalized Recommendations: Our reports include advice tailored to your unique situation to maximize your chances of success.",
      link: "/calculator",
    },
    {
        title: "Financing Simulators",
        description1: "At IziKemp, we offer a comprehensive range of simulators tailored to precisely meet your financial needs. Whether you're considering a bank loan...",
        description2: "Speed and Efficiency: Obtain your results instantly to make informed decisions.",
        description3: "Personalized Recommendations: Our reports include advice tailored to your unique situation to maximize your chances of success.",
        link: "/calculator",
    },
    {
        title: "Financing Simulators",
        description1: "At IziKemp, we offer a comprehensive range of simulators tailored to precisely meet your financial needs. Whether you're considering a bank loan...",
        description2: "Speed and Efficiency: Obtain your results instantly to make informed decisions.",
        description3: "Personalized Recommendations: Our reports include advice tailored to your unique situation to maximize your chances of success.",
        link: "/calculator",
    },
  ];

  return (
    <div className="lg:flex items-center block my-1 bg-gradient-to-tr from-indigo-950 via-indigo-900 to-violet-950">
      <div className="w-full lg:w-[40%] h-full text-center p-2 text-white">
        <p className="lg:text-5xl text-2xl md:text-4xl font-bold my-6 w-60 mx-auto">
          Services
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
