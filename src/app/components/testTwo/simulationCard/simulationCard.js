"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const SimulationCard = () => {
    const { t } = useTranslation();

    return (
        <div className="my-1 relative">
            <div className="lg:flex block ">
                <div className="w-full  lg:w-[50%] bg-desColor shadow-2xl p-10">
                    <div className="w-14 h-1.5 bg-btnColor my-2"></div>
                    <p className="text-white lg:w-96 w-full lg:text-3xl text-2xl mt-20">
                        HOME: Ignite Your Entrepreneurial Ambition with IziKemp
                    </p>
                    <div className="w-80 h-0.5 bg-white my-6"></div>
                    <p className="text-white lg:w-96 w-full my-2">• Turn your entrepreneurial dream
                        into reality with the help of our
                        smart tools and dedicated experts.</p>
                    <p className="text-white lg:w-96 w-full my-2">• At IziKemp, we simplify the
                        funding process, providing tailored
                        solutions that give you the edge in
                    </p>
                    <p className="text-blue-500 lg:w-96 w-full my-2">• securing finances.</p>
                </div>
                <div className="relative lg:w-[50%] w-full h-full">
                    <Image
                        width={1000}
                        height={1000}
                        src="/images/lp5.jpg"
                        alt="Analytics Image"
                        className="w-full lg:h-[500px] h-full object-cover opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-desColor"></div>
                </div>
            </div>
            <Link
                href="/login"
                className="absolute bottom-6  lg:left-[500px] left-4 flex justify-center lg:w-60 w-40 text-center lg:p-4 p-2 lg:text-lg text-sm hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full"
            >
                {t("startSimulation")}
            </Link>
        </div>
    );
};

export default SimulationCard;
