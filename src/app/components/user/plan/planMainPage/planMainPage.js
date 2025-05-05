"use client";
import React, { useState } from "react";
import Idea from "../idea/idea";
import Presentation from "../presentation/presentation";
import VisitingCard from "../visitingCard/visitingCard";
import Carrier from "../carrier/carrier";
import Offer from "../offer/offer";
import Walk from "../walk/walk";
import Partners from "../partner/partner";
import Competitors from "../competitors/competitors";
import Customers from "../customers/customers";
import Commercial from "../commercial/commercial";
import CustomerAcquisition from "../customerAcquisition/customerAcquisition";
import Financials from "../financials/financials";
import PlanSidebar from "../planSidebar/planSidebar";

const components = {
  Idea,
  Presentation,
  VisitingCard,
  Carrier,
  Offer,
  Walk,
  Competitors,
  Customers,
  Commercial,
  CustomerAcquisition,
  Financials,
};

const PlanMainPage = ({ t }) => {
  const [activeStep, setActiveStep] = useState("Idea");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const goToNext = () => {
    const steps = Object.keys(components);
    const currentIndex = steps.indexOf(activeStep);
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1]);
    }
  };

  const ActiveComponent = components[activeStep];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Toggle button for small screens */}
      <button
        className="md:hidden p-4 bg-gray-800 text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Sidebar - always visible on md+ screens, toggleable on mobile */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-1/4 bg-gray-100`}
      >
        <PlanSidebar t={t} activeStep={activeStep} onStepChange={setActiveStep} />
      </div>

      {/* Step Content */}
      <div className="flex-1 p-4">
        <ActiveComponent t={t} goToNext={goToNext} />
      </div>
    </div>
  );
};

export default PlanMainPage;
