"use client"
import React, { useState } from "react";
import Idea from '../idea/idea';
import Presentation from '../presentation/presentation';
import VisitingCard from '../visitingCard/visitingCard';
import Carrier from '../carrier/carrier';
import Offer from '../offer/offer';
import Walk from '../walk/walk';
import Partners from '../partner/partner';
import Competitors from '../competitors/competitors';
import Customers from '../customers/customers';
import Commercial from '../commercial/commercial';
import CustomerAcquisition from '../customerAcquisition/customerAcquisition';
import PlanSidebar from '../planSidebar/planSidebar';
const components = {
    Idea,
    Presentation,
    "Visiting card": VisitingCard,
    Carrier,
    Offer,
    Walk,
    Partners,
    Competitors,
    Customers,
    Commercial,
    "Customer acquisition": CustomerAcquisition,
};

const PlanMainPage = () => {
    const [activeStep, setActiveStep] = useState("Idea");

    const goToNext = () => {
        const steps = Object.keys(components);
        const currentIndex = steps.indexOf(activeStep);
        if (currentIndex < steps.length - 1) {
            setActiveStep(steps[currentIndex + 1]);
        }
    };

    const ActiveComponent = components[activeStep];

    return (
        <div className="flex">
            {/* Sidebar */}
            <PlanSidebar activeStep={activeStep} onStepChange={setActiveStep} />

            {/* Step Content */}
            <div className="flex-1 p-4">
                <ActiveComponent goToNext={goToNext} />
            </div>
        </div>
    );
};

export default PlanMainPage;
