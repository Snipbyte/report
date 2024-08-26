import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { PiAddressBookTabsLight } from "react-icons/pi";
import { BiRevision } from "react-icons/bi";
const ContactSection = () => {
  return (
    <div className="md:flex p-20 bg-white">
      <div className=" bg-[url(/images/pattern1.avif)] w-full h-screen bg-center  bg-cover md:w-[50%] w-full p-10 ">
        <h2 className="text-2xl font-bold">Contact us</h2>
        <p className="text-xs text-paraColor mt-3">
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        </p>
        <div className="flex items-center gap-3 text-paraColor mt-5">
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedinIn />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 mt-56">
              <PiAddressBookTabsLight className="text-xl text-btnColor" />
              <p className="text-sm font-bold">Address</p>
            </div>
            <p className="text-xs text-paraColor mt-2">
              1881 Devmads,UK , German,
              <br />
              Laomi 5665, USA
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1 mt-56">
              <BiRevision className="text-xl text-btnColor" />
              <p className="text-sm font-bold">Visit Us</p>
            </div>
            <p className="text-xs text-paraColor mt-2">
              1881 Devmads,UK , German,
              <br />
              Laomi 5665, USA
            </p>
          </div>
        </div>
      </div>
      <div className="  md:w-[50%] w-full p-10">
        <div>
          <label className="text-sm">Full Name</label>
          <br />
          <input
            type="text"
            placeholder="Your name"
            className="text-sm w-full p-1.5 outline-none  rounded border-2 mt-2"
          />
        </div>
        <div className="mt-5">
          <label className="text-sm">Email</label>
          <br />
          <input
            type="email"
            placeholder="Your name"
            className="text-sm w-full p-1.5 outline-none  rounded border-2 mt-2"
          />
        </div>
        <div className="mt-5">
          <label className="text-sm">Company Name</label>
          <br />
          <input
            type="text"
            placeholder="Your Company name"
            className="text-sm w-full p-1.5 outline-none  rounded border-2 mt-2"
          />
        </div>
        <div className="mt-5">
          <label className="text-sm">Company Size</label>
          <br />
          <input
            type="text"
            placeholder="Less than 100 employees"
            className="text-sm w-full p-1.5 outline-none  rounded border-2 mt-2"
          />
        </div>
        <div className="flex items-center gap-1 mt-5">
          <input type="checkbox" />
          <p className="text-xs text-paraColor">
            I agree to Privacy Policy and Terms of Use
          </p>
        </div>
        <div className="mt-5">
          <button className="w-full text-sm hover:text-white hover:bg-desColor duration-700 border-2 border-desColor rounded-full p-1.5 ">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
