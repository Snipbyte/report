import Image from "next/image";
import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
const ContentSection = () => {
  return (
    <div>
      <h3 className="text-3xl font-bold text-center mt-10">
        Identify, manage, & validate product ideas
      </h3>
      <p className="text-xs text-paraColor text-center mt-4">
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum lorem ipsum
        <br /> lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
        ipsum
      </p>
      <div className="flex items-center justify-center gap-10 p-10 mt-10">
        <div>
        <Image className="w-[400px] rounded-md" src="/images/contentgraph.png" width={500} height={500}/>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Seamless collaboration</h2>
          <div className="flex items-center gap-1 mt-2">
            <IoIosCheckmarkCircleOutline className="text-hoverBtnColor" />
            <p className="text-sm text-paraColor">
              organization-wide collaboration made easy
            </p>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <IoIosCheckmarkCircleOutline className="text-hoverBtnColor" />
            <p className="text-sm text-paraColor">
              organization-wide collaboration made easy
            </p>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <IoIosCheckmarkCircleOutline className="text-hoverBtnColor" />
            <p className="text-sm text-paraColor">
              organization-wide collaboration made easy
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-10 p-10 mt-10">
        <div>
          <h2 className="text-2xl font-bold">Seamless collaboration</h2>
          <div className="flex items-center gap-1 mt-2">
            <IoIosCheckmarkCircleOutline className="text-hoverBtnColor" />
            <p className="text-xs text-paraColor">
              organization-wide collaboration made easy
            </p>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <IoIosCheckmarkCircleOutline className="text-hoverBtnColor" />
            <p className="text-xs text-paraColor">
              organization-wide collaboration made easy
            </p>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <IoIosCheckmarkCircleOutline className="text-hoverBtnColor" />
            <p className="text-xs text-paraColor">
              organization-wide collaboration made easy
            </p>
          </div>
        </div>
        <div>
          <Image className="" src="/images/contentdashboard2.png" width={400} height={400}/>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
