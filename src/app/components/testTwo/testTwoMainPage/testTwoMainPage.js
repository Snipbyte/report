"use client";
import React from "react";
import Header from "../../common/header/page";
import Footer from "../../common/footer/page";
import SimulationCard from "../simulationCard/simulationCard";
import CalculatorSection from "../calculatorSection/calculatorSection";
import TestimonialSection from "../testimonialSection/testimonialSection";
import BlogNews from "../blogNews/blogNews";
import ClientPortal from "../clientPortal/clientPortal";
import WorkSection from "../workSection/workSection";
import ChooseSection from "../chooseSection/chooseSection";
import ServiceCard from "../serviceCard/serviceCard";
import { MdOutlinePayments } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { FaPersonChalkboard } from "react-icons/fa6";
import ServicesContent from "../servicesContent/servicesContent";
import ContactSection from "../contactSection/contactSection";
import { useTranslation } from "react-i18next";

const TestTwoMainPage = () => {
  const { t } = useTranslation();
  const services = [
    {
      bgColor: "bg-orange-400",
      icon: <MdOutlinePayments />,
      heading: `${t("sentence13")}`,
    },
    {
      bgColor: "bg-gray-400",
      icon: <GoGraph />,
      heading: `${t("sentence14")}`,
    },
    {
      bgColor: "bg-yellow-400",
      icon: <FaPersonChalkboard />,
      heading: `${t("sentence15")}`,
    },
  ];
  return (
    <div>
      <Header />
      <SimulationCard />
      <ChooseSection />
      <p className="bg-gradient-to-tr from-indigo-950 via-blue-950 to-violet-950 text-white text-xl md:text-3xl lg:text-5xl text-center p-10">
        {t("sentence12")}
      </p>
      <div className="md:flex block items-center justify-around mt-12 p-2">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            bgColor={service.bgColor}
            icon={service.icon}
            heading={service.heading}
          />
        ))}
      </div>
      <WorkSection />
      <CalculatorSection />
      <TestimonialSection />
      <BlogNews />
      <ServicesContent />
      <ClientPortal />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default TestTwoMainPage;
