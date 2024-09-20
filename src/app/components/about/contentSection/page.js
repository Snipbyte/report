"use client";
import Image from "next/image";
import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";

const ContentSection = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="lg:text-5xl text-2xl w-[600px] mx-auto font-bold text-center mt-10">
      {t("trustedPartner")}
      </h3>
      <p className="text-lg text-paraColor text-center mt-4 w-[900px] mx-auto">
      
    
      </p>
      <div className="flex items-center justify-center gap-10 p-10 mt-10">
        <div></div>
        <div>
          <h2 className="text-4xl font-bold">  {t("empoweringEntrepreneurs")}</h2>
          <p className="text-md text-paraColor mt-4">
          
          {t("foundersChallenges")}
          </p>
          <p className="text-md text-paraColor mt-4">
          {t("teamOfExperts")}
          </p>
          <p className="text-md text-paraColor mt-4">
          {t("partnerSupport")}
          </p>
          <p className="text-md text-paraColor mt-4">
          {t("moveForward")}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-10 p-10 mt-10">
        <div>
          <Image
            className="w-[400px] rounded-md"
            src="/images/contentdashboard2.png"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
