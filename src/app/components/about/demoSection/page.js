"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const DemoSection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-desColor p-6 md:p-10 mx-4 md:mx-20 rounded-lg relative h-[300px] flex flex-col justify-center items-center">
      <p className="text-white text-md">- {t("liveDemo")}</p>
      <h2 className="text-2xl md:text-3xl text-white font-bold mt-5 text-center w-full md:w-[70%]">
        {t("demoMsg")}
      </h2>
      <div className="my-5">
        <Link
          href="/login"
          className="w-full md:w-32 rounded-full text-md text-white bg-btnColor hover:bg-hoverBtnColor px-4 py-2 duration-700 mt-5 text-center"
        >
          {t("bookDemo")}
        </Link>
      </div>
      <div className="hidden lg:block absolute top-0 right-0 md:right-10 bottom-[-50px] md:bottom-[-100px] w-1/2 md:w-[300px]">
        <Image
          className="h-full w-full object-contain"
          src="/images/demo.png"
          width={500}
          height={500}
          alt="Demo"
        />
      </div>
    </div>
  );
};

export default DemoSection;
