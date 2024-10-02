"use client";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const EntrepreneursCard = () => {
  const { t } = useTranslation();

  return (
    <div className="lg:flex block items-center justify-center p-10 shadow">
      <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
        <p className="text-headingColor text-2xl lg:text-4xl p-6 lg:p-10 text-left">
          {t("freeConsultationfinal")}
        </p>
      </div>

      <div className="lg:w-1/2 w-full lg:h-[420px] h-full">
        <div className="grid grid-rows-3 grid-cols-2 gap-2">
          <div className="row-span-3 col-span-2 lg:col-span-1">
            <Image
              className="rounded-md w-full h-[410px] object-cover"
              src="/images/worker3.jpg"
              width={1000}
              height={1000}
              alt="Worker 3"
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Image
              className="rounded-md w-full h-[200px]  object-cover"
              src="/images/worker1.jpg"
              width={1000}
              height={1000}
              alt="Worker 1"
            />
          </div>
          <div className="row-span-2 col-span-2 lg:col-span-1">
            <Image
              className="rounded-md w-full h-[200px]  object-cover"
              src="/images/worker2.jpg"
              width={1000}
              height={1000}
              alt="Worker 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneursCard;
