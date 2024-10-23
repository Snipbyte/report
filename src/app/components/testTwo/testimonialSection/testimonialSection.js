"use client";

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
            <p className=" text-headingColor mt-2">• {t("sentence22")}</p>
            <p className="text-headingColor my-2">• {t("sentence23")}</p>
          </div>
          <div className="my-1">
            <p className=" text-headingColor mt-2">• {t("sentence24")}</p>
            <p className="text-headingColor my-2">• {t("sentence25")}</p>
          </div>
          <div className="my-1">
            <p className=" text-headingColor mt-2">• {t("sentence26")}</p>
            <p className="text-headingColor my-2">•{t("sentence27")}</p>
          </div>
          <div className="my-1">
            <p className=" text-headingColor mt-2">{t("sentence28")}</p>
            <p className="text-headingColor my-2">• {t("sentence29")}</p>
          </div>
          <div className="my-1">
            <p className=" text-headingColor mt-2">• {t("sentence30")}</p>
            <p className="text-headingColor my-2">•{t("sentence31")}</p>
          </div>
          <div className="my-1">
            <p className=" text-headingColor mt-2">• {t("sentence32")}</p>
            <p className="text-headingColor my-2">•{t("sentence33")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
