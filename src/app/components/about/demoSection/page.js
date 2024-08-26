import Image from "next/image";
import React from "react";

const DemoSection = () => {
  return (
    <div className="bg-desColor p-10 mx-20 rounded-lg relative h-[300px]">
      <p className="text-white text-sm">- Shedule a LIVE demo</p>
      <h2 className="text-2xl text-white font-bold mt-5">
        Explore the app with a guided tour
        <br />
        and discuss how it would fit into
        <br /> your processes!
      </h2>
      <button className="w-fit rounded-full text-sm text-white hover:bg-white hover:text-black px-2 py-2 duration-700 border-2 mt-5">
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
