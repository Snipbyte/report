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
                    <p className="text-headingColor lg:text-3xl text-xl md:text-2xl  mb-4 font-bold">
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
                <div className="text-xs">
                    <div className="my-1">
                        <p className=" text-headingColor mt-2">
                            •  "Thanks to IziKemp, I secured a crucial loan for my business expansion. The personalized recommendations and expert assistance made all the difference!"
                        </p>
                            <p className="text-headingColor my-2">
                                •  — Alexia M., {t("successfulEntrepreneur")}
                            </p>
                    </div>
                    <div className="my-1">
                        <p className=" text-headingColor mt-2">
                            •  "I always hesitated to seek funding, but with IziKemp, the process became clear and structured. Receiving an immediate and accurate report truly reassured me!"
                        </p>
                        <p className="text-headingColor my-2">
                            • — Nadia T., Business Creator
                        </p>
                    </div>
                    <div className="my-1">
                        <p className=" text-headingColor mt-2">
                            •   "IziKemp transformed what I thought would be a daunting funding journey into a straightforward and tailored process. Their expert guidance was invaluable
                            in helping me get the right loan for my restaurant's renovation."
                        </p>
                        <p className="text-headingColor my-2">
                            •— Ousmane L., Restaurant Owner
                        </p>
                    </div>
                    <div className="my-1">
                        <p className=" text-headingColor mt-2">
                            •   "The clarity and precision of IziKemp's approach gave me the confidence to apply for funding. With their support, I was able to finance the development of
                            my tech startup seamlessly!"
                        </p>
                        <p className="text-headingColor my-2">
                            • — Marie-Paul R., Tech Innovator
                        </p>
                    </div>
                    <div className="my-1">
                        <p className=" text-headingColor mt-2">
                            •  "Navigating the complexities of business finance seemed overwhelming until I found IziKemp. Their comprehensive report and customized advice were
                            exactly what I needed to secure the backing for my boutique."
                        </p>
                        <p className="text-headingColor my-2">
                            • — Sarah K., Boutique Owner
                        </p>
                    </div>
                    <div className="my-1">
                        <p className=" text-headingColor mt-2">
                            •   "Thanks to IziKemp, I didn't just receive a loan; I received peace of mind and a clear path forward. Their dedication to understanding my business needs was
                            exceptional!"
                        </p>
                        <p className="text-headingColor my-2">
                            • — David H., Small Business Owner
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TestimonialSection;
