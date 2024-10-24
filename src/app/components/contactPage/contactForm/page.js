"use client";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();

  return (
    <div className=" w-full p-10">
      <p className="text-headingColor text-3xl text-center my-4 font-bold">
      {t("help")}
      
      </p>
      <p className="text-paraColor text-sm text- mb-6">
      {t("helpInfo")}
      
      </p>
      {/* <h2 className="font-light md:text-2xl text-xl text-headingColor">
        Address
      </h2> */}
      <hr className="my-4" />
      <div className="flex items-center gap-1 my-4">
        <IoCall className="text-paraColor" />
        <p className="text-paraColor text-sm font-light">+331 8884 0167</p>
      </div>
      <div className="flex items-center gap-1">
        <FaEnvelope className="text-paraColor" />
        <p className="text-paraColor text-sm font-light">info@izikemp.com</p>
      </div>
      {/* <h2 className="font-light md:text-2xl text-xl mt-10">Contact us</h2> */}
      <hr className="my-4" />
      <section class="bg-white ">
        <div class="py-8 lg:py-6 px-4 mx-auto max-w-screen-md">
          <form action="#" class="space-y-8">
            <div className="md:flex items-center justify-between">
              <div>
                <input
                  type="text"
                  id="text"
                  class="shadow-sm bg-white border  text-paraColor text-sm  focus:ring-primary-500 focus:border-primary-500 block w-full md:w-[250px] p-2.5 outline-none"
                  placeholder={`${t("name")} :`}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  class="shadow-sm bg-white border  text-paraColor text-sm  focus:ring-primary-500 focus:border-primary-500 block w-full md:w-[250px] p-2.5 outline-none my-8 md:my-0"
                  placeholder={`${t("email")} :`}
                  required
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                id="subject"
                class="block p-3 w-full text-sm text-paraColor bg-white border  shadow-sm focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder={`${t("subject")} :`}
                required
              />
            </div>
            <div class="sm:col-span-2">
              <textarea
                id="message"
                rows="6"
                class="block p-2.5 w-full text-sm text-paraColor  bg-white shadow-sm border  focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder={`${t("message")} :`}
              ></textarea>
            </div>
            <button
              type="submit"
              class="py-3 px-5 text-sm font-medium text-center   hover:bg-hoverBtnColor outline-none text-white bg-btnColor border border-btnColor hover:text-white"
            >
             {`${t("sendMsg")} :`}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
