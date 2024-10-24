"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const AmbitionCard = () => {
  const { t } = useTranslation();

  return (
    <div className="lg:flex block my-10">
      <div className="w-full lg:w-[50%]">
        <Image
          className="w-full lg:h-[400px] h-full"
          src="/images/lp7.jpg"
          width={1000}
          height={1000}
        />
      </div>
      <div className="w-full   lg:w-[50%]  bg-lightCard shadow-2xl p-10">
        <p className="text-headingColor  text-3xl my-4">{t("tryIziKemp")}</p>
        <div className="flex justify-center">
          <Link
            href="/calculator"
            className="w-60 text-center p-4 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full my-4"
          >
            {t("startSimulation")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AmbitionCard;
