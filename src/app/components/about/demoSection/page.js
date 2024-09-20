"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useTranslation } from "react-i18next";

const DemoSection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-desColor p-10 mx-20 rounded-lg relative h-[300px]">
      <p className="text-white text-md">- {t("liveDemo")}</p>
      <h2 className="text-3xl text-white font-bold mt-5 w-[70%]">
      {t("demoMsg")}
      </h2>
      <div className="my-5">
        <Link
          href="/login"
          className="my-5 w-32 rounded-full text-md text-white bg-btnColor hover:bg-hoverBtnColor  px-2 py-2 duration-700  mt-5"
        >
           {t("bookDemo")}
        
        </Link>
      </div>
      <div className="absolute top-0 bottom-[-100px] left-[700px] ">
        <Image
          className=" h-[300px] "
          src="/images/demo.png"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default DemoSection;
