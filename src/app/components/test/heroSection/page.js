"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-desColor p-2">
      <p className="text-white my-6 lg:text-6xl text-2xl text-center font-bold">
        {t("igniteAmbitionfinal")}
      </p>
      <p className="text-white text-xl text-center w-full lg:w-[500px] mx-auto my-6">
        {t("turnDreamIntoRealityfinal")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-5 my-8">
        <Link href="/generate-report" className="w-full lg:w-56 text-center p-3 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-md">
          {t("businessPlanGeneratorfinal")}
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 my-8">
        <Image
          className="w-full md:w-64 h-auto rounded-md"
          src="/images/worker1.jpg"
          width={1000}
          height={1000}
          alt="Worker 1"
        />
        <Image
          className="w-full md:w-64 h-auto rounded-md"
          src="/images/image3.jpg"
          width={1000}
          height={1000}
          alt="Image 3"
        />
        <Image
          className="w-full md:w-64 h-auto rounded-md"
          src="/images/image1.jpg"
          width={1000}
          height={1000}
          alt="Image 1"
        />
        <Image
          className="w-full md:w-64 h-auto rounded-md"
          src="/images/image2.jpg"
          width={1000}
          height={1000}
          alt="Image 2"
        />
        <Image
          className="w-full md:w-64 h-auto rounded-md"
          src="/images/worker2.jpg"
          width={1000}
          height={1000}
          alt="Worker 2"
        />
      </div>
    </div>
  );
};

export default HeroSection;
