"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const TestimonialSection = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="relative">
                <Image
                    className="w-full lg:h-full "
                    src="/images/lp8.jpg"
                    width={1000}
                    height={1000}
                />
            </div>
            <div className="lg:flex block items-center p-16 gap-48">
                <div>
                <p className="text-headingColor lg:text-3xl text-xl md:text-2xl font-bold">
                    {" "}
                    {t("testimonials")}
                </p>
                <Link
                    href="/login"
                    className="flex justify-center lg:w-60 w-40 text-center lg:p-4 p-2 lg:text-lg text-sm hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full"
                >
                    {t("startSimulation")}
                </Link>
                </div>
                <div>
                    <p className="text-lg text-headingColor mt-2">
                        {t("testimonial1")}&quot;
                    </p>
                    <p className="text-headingColor text-md my-4">
                        — Alexia M., {t("successfulEntrepreneur")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSection;
