import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-lightCard p-5">
        
      <h3 className="text-5xl font-bold text-center ">
        Collaborative solution <br />
        <span className="text-hoverBtnColor">for large teams</span>{" "}
      </h3>
      <p className="text-xs text-paraColor text-center mt-4">
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum lorem ipsum
        <br /> lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
        ipsum
      </p>
      <div className="p-10">
        <Image
          className="w-full rounded-md h-[600px] "
          src="/images/dashboard5.avif"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default HeroSection;
