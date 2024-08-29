import React from "react";
import { MdSpeed } from "react-icons/md";
import { SiSpeedypage } from "react-icons/si";
import { SiWebmoney } from "react-icons/si";
const ReportForm = () => {
  return (
    <div className="md:flex  md:p-10 p-4">
      <div className="md:w-[60%] w-full  bg-lightCard md:p-10 p-4">
        <h2 className="text-2xl font-bold">
          Ger detailed Credit Report Analysis in
          <br /> Less than 1 min for Free
        </h2>
        <p className="text-sm text-btnColor mt-2">
          join 1,00,000+ people who NOW understand their credit report Details.
        </p>
        <div className="md:flex justify-between mt-8 gap-2">
          <div>
            <label className="text-sm">First Name</label>
            <br />
            <input type="text" className="border md:w-80 w-full p-1.5 rounded-lg" />
          </div>
          <div>
            <label className="text-sm">First Name</label>
            <br />
            <input type="text" className="border md:w-80 w-full p-1.5 rounded-lg" />
          </div>
        </div>
        <div className="flex gap-5 mt-8">
          <div>
            <select className="text-headingColor outline-none p-2 border w-[140px] lg:w-[240px] rounded-lg">
              <option value="01">Day</option>
              <option value="02">02</option>
              <option value="02">03</option>
              <option value="02">04</option>
              <option value="02">05</option>
            </select>
          </div>

          <select className="text-headingColor outline-none p-2 border w-[150px] lg:w-[255px]  rounded-lg">
            <option value="01">Month</option>
            <option value="02">02</option>
            <option value="02">03</option>
            <option value="02">04</option>
            <option value="02">05</option>
          </select>

          <select className="text-headingColor outline-none p-2 border w-[150px] lg:w-[255px]  rounded-lg">
            <option value="01">Year</option>
            <option value="02">02</option>
            <option value="02">03</option>
            <option value="02">04</option>
            <option value="02">05</option>
          </select>
        </div>
        <div className="mt-8">
          <label className="text-sm">Mobile Number</label>
          <br />
          <input type="number" className="border w-full p-1.5 rounded-lg" />
        </div>
        <div className="md:flex justify-between mt-8 gap-2">
          <div>
            <label className="text-sm">Pin number</label>
            <br />
            <input type="text" className="border md:w-80 w-full p-1.5 rounded-lg" />
          </div>
          <div>
            <label className="text-sm">Pin code</label>
            <br />
            <input type="text" className="border md:w-80 w-full p-1.5 rounded-lg" />
          </div>
        </div>

        <button className="hover:text-white hover:bg-desColor w-full rounded-full text-sm p-1.5 mt-8 duration-700 border-2">
          Get my Credit Score
        </button>
        <p className="text-paraColor text-sm text-center mt-4">
          Already have an account?{" "}
          <span className="text-sm text-btnColor">Signin</span>
        </p>
      </div>
      <div className="md:w-[40%] w-full p-10 bg-desColor">
        <div>
        <p className="text-white text-center">image here</p>
        </div>
        <h2 className="text-white text-center mt-10">Save$ 4300! Get your Free <br/>Credit report Analysis</h2>
        <p className="text-gray-400 text-sm text-center mt-2">Understand your current financial position <br/>how you can improve</p>
        <div className="flex items-center gap-2 justify-center mt-10">
        <div>
<MdSpeed className="text-white text-2xl"/>
</div>
<div className="">
<p className="text-sm text-white">Won it credit score</p>
<p className="text-xs text-gray-400">lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
</div>
 
        </div>
        <div className="flex items-center gap-2 justify-center mt-10">
        <div>
        <SiSpeedypage  className="text-white text-2xl"/>
</div>
<div className="">
<p className="text-sm text-white">Free Forever</p>
<p className="text-xs text-gray-400">lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
</div>
 
        </div>
        <div className="flex items-center gap-2 justify-center mt-10">
        <div>
        <SiWebmoney className="text-white text-2xl"/>
</div>
<div className="">
<p className="text-sm text-white">Saving and credit advice</p>
<p className="text-xs text-gray-400">lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
</div>
 
        </div>


    </div>
    </div>
  );
};

export default ReportForm;
