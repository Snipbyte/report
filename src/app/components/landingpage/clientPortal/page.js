"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const ClientPortal = () => {
  const { t } = useTranslation();

  return (
    <div className=" relative">
      <div className="lg:flex block ">
        <div className="w-full  lg:w-[50%] bg-black shadow-2xl p-10">
          <div className="w-14 h-1.5 bg-btnColor mt-10 mb-20"></div>
          <p className="text-white my-5 text-2xl font-bold">{t("clientPortalfinal")}</p>
          <div className="w-80 h-0.5 bg-white"></div>
          <ul className="list-disc list-inside p-2 text-white lg:w-96 w-full text-lg mt-20">
            <li> {t("your2")}</li>
            <li>{t("your3")}</li>
          </ul>
        </div>
        <div className="relative lg:w-[50%] w-full h-full">
          <Image
            width={1000}
            height={1000}
            src="/images/dashboard.png"
            alt="Analytics Image"
            className="w-full lg:h-[600px] h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black"></div>
        </div>
        <Link
          href="/login"
          className="absolute bottom-10  lg:left-[500px] left-4 flex justify-center w-68 text-center p-4 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full"
        >
          {t("login")}
        </Link>
      </div>
    </div>
  );
};

export default ClientPortal;
