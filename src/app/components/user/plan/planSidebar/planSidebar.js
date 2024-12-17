"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";

const headings = [
    "Idea",
    "Presentation",
    "Visiting card",
    "Carrier",
    "Offer",
    "Walk",
    "Competitors",
    "Customers",
    "Commercial",
    "Customer acquisition",
];

const PlanSidebar = ({ activeStep, onStepChange }) => {
    return (
        <div className="w-[25%] bg-white text-center px-10">
            <Image className="w-24 mx-auto my-4" width={1000} height={1000} src="/images/logo.png" />
            <div className="text-btnColor flex items-center gap-2 text-2xl justify-center font-bold">
                <FaRegLightbulb />
                <p>Plan</p>
            </div>
            {headings.map((heading) => (
                <div
                    key={heading}
                    onClick={() => onStepChange(heading)}
                    className={`p-2 cursor-pointer my-1
                     ${activeStep === heading
                        ? "font-bold text-btnColor bg-btnColor bg-opacity-20"
                        : "text-paraColor"
                        }`}
                >
                    {heading}
                </div>
            ))}
        </div>
    );
};

export default PlanSidebar;
