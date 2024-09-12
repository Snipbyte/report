import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-lightCard p-5">
        
      <h3 className="lg:text-6xl text-3xl font-bold text-center ">
        Collaborative solution <br />
        <span className="text-hoverBtnColor">for large teams</span>{" "}
      </h3>
      <p className="text-lg text-paraColor text-center mt-4 w-[900px] mx-auto">
      Our team is committed to delivering accurate and insightful reports, combining data-driven analysis with expert perspectives to provide clear, actionable information. We strive to maintain the highest standards of integrity and transparency in all our reporting.
      </p>
      <div className="p-20">
        <Image
          className="w-full rounded-md h-[550px] "
          src="/images/aboutus.jpg"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default HeroSection;
