import Image from "next/image";
import React from "react";

const DemoSection = () => {
  return (
    <div className="bg-desColor p-10 mx-20 rounded-lg relative h-[300px]">
      <p className="text-white text-md">- Shedule a LIVE demo</p>
      <h2 className="text-3xl text-white font-bold mt-5">
        Explore the app with a guided tour
        <br />
        and discuss how it would fit into
        <br /> your processes!
      </h2>
      <button className="w-32 rounded-full text-md text-white bg-btnColor hover:bg-hoverBtnColor  px-2 py-2 duration-700  mt-5">
        Book Demo
      </button>
      <div className="absolute top-0 bottom-[-100px] left-[700px] ">
        <Image
          className=" h-[300px] "
          src="/images/demo.png"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default DemoSection;
