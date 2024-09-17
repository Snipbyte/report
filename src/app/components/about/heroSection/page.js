import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-lightCard p-5">
        
      <h3 className="lg:text-6xl text-3xl font-bold text-center ">
      Your Trusted  <br />
        <span className="text-hoverBtnColor">Partner in Financing</span>{" "}
      </h3>
      <p className="text-lg text-paraColor text-center mt-4 w-[900px] mx-auto">
      At IziKemp, our mission is to empower entrepreneurs with powerful tools and expert advice. Explore our story, meet our team, and find out how we can help turn your ambitions into achievements.
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
