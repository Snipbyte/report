import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
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
        <svg
          className="absolute lg:top-4 top-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,192L80,208C160,224,320,256,480,256C640,256,800,224,960,224C1120,224,1280,256,1360,272L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="lg:flex block items-center p-16 gap-48">
        <p className="text-headingColor text-3xl font-bold">
          {" "}
          {t("testimonials")}
        </p>
        <div>
          <p className="text-lg text-headingColor mt-2">
            {t("testimonial1")}&quot;
          </p>
          <p className="text-headingColor text-md my-4">
            — Alexia M., {t("successfulEntrepreneur")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
