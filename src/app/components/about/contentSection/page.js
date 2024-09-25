"use client";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const ContentSection = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="lg:text-5xl text-2xl font-bold text-center mt-10 max-w-2xl mx-auto">
        {t("trustedPartner")}
      </h3>
     
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 p-10 mt-10">
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold">{t("empoweringEntrepreneurs")}</h2>
          <p className="text-md text-paraColor mt-4">{t("foundersChallenges")}</p>
          <p className="text-md text-paraColor mt-4">{t("teamOfExperts")}</p>
          <p className="text-md text-paraColor mt-4">{t("partnerSupport")}</p>
          <p className="text-md text-paraColor mt-4">{t("moveForward")}</p>
        </div>
        <div className="flex justify-center lg:w-1/2">
          <Image
            className="w-full max-w-[400px] rounded-md"
            src="/images/contentdashboard2.png"
            width={500}
            height={500}
            alt="Content Dashboard"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
