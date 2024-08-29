import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
const ContactForm = () => {
  return (
    <div className=" w-full p-10">
      <p className="text-headingColor text-3xl text-center my-4 font-bold">We’re Here to Help</p>
      <p className="text-paraColor text-sm text- mb-6">For any inquiries or specific issues, feel free to contact us via our form or on social media. Join our dynamic community of successful entrepreneurs!</p>
      <h2 className="font-light md:text-2xl text-xl text-headingColor">Address</h2>
      <hr className="my-4" />
      <div className="flex items-center gap-1">
        <FaLocationDot className="text-paraColor" />
        <p className="text-paraColor text-sm font-light">
          Your address at Lutaco Tower 007A Nguyen Van Tori
        </p>
      </div>
      <div className="flex items-center gap-1 my-4">
        <IoCall className="text-paraColor" />
        <p className="text-paraColor text-sm font-light">+008 1234 6789</p>
      </div>
      <div className="flex items-center gap-1">
        <FaEnvelope className="text-paraColor" />
        <p className="text-paraColor text-sm font-light">xyz@example.com</p>
      </div>
      <h2 className="font-light md:text-2xl text-xl mt-10">Contact us</h2>
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
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  class="shadow-sm bg-white border  text-paraColor text-sm  focus:ring-primary-500 focus:border-primary-500 block w-full md:w-[250px] p-2.5 outline-none my-8 md:my-0"
                  placeholder="Email:"
                  required
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                id="subject"
                class="block p-3 w-full text-sm text-paraColor bg-white border  shadow-sm focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Subject:"
                required
              />
            </div>
            <div class="sm:col-span-2">
              <textarea
                id="message"
                rows="6"
                class="block p-2.5 w-full text-sm text-paraColor  bg-white shadow-sm border  focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Message:"
              ></textarea>
            </div>
            <button
              type="submit"
              class="py-3 px-5 text-sm font-medium text-center   hover:bg-hoverBtnColor outline-none text-white bg-btnColor border border-btnColor hover:text-white"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
