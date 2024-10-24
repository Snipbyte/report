"use client"

import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const GuaidanceCard = () => {
  const { t } = useTranslation();

  return (
    <div className="lg:flex block ">
      <div className="w-full lg:h-[500px] h-full lg:w-[50%] bg-white p-10">
        <p className="text-4xl font-bold text-headingColor my-2">
          {" "}
          {t("heading1")}
        </p>
        <div className="w-full h-1.5 bg-btnColor my-10"></div>
        <p className="text-headingColor  text-md my-4">{t("description6")}</p>
        <p className="text-headingColor  text-md my-4">{t("description7")}</p>
        <p className="text-headingColor  text-md my-4">{t("description8")}</p>
        <p className="text-headingColor  text-md my-4">{t("description9")}</p>
        <p className="text-headingColor  text-md my-4">{t("description10")}</p>
      </div>
      <div className="w-full lg:w-[50%]">
        <Image
          className="w-full lg:h-[500px] h-full"
          src="/images/capture5.jpeg"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default GuaidanceCard;
