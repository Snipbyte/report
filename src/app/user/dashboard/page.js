import BarChart from "@/app/components/common/Charts/BarChart/page";
import ContentSection from "@/app/components/user/dashboard/contentSection/page";
import LineChart from "@/app/components/common/Charts/lineChart/page";
import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import UserLayout from "@/app/components/layouts/userLayout/page";

const Dashboard = () => {
  return (
    <UserLayout>
      <div className="p-3">
        <ContentSection />
        <p className="text-headingColor my-4 text-4xl font-bold">
          Total Revenue
        </p>
        <LineChart />
        <div className="md:flex block justify-center gap-5">
          <div className="md:w-[75%] w-full">
            <BarChart heading="Avg. Ticket Created" />
          </div>
          <div className="bg-gradient-to-tr from-btnColor via-hoverBtnColor to-headingColor  md:w-[25%] w-full h-full p-4 rounded-lg">
            <p className="text-4xl text-white my-3">Pro Mode</p>
            <p className="text-white text-md mb-16">
              Upgrade now to unlock all features you need.
            </p>
            <div className="flex items-center justify-center gap-1 w-28 p-2 rounded-md bg-white text-btnColor text-center text-sm hover:text-white hover:border border-white hover:bg-transparent">
              <button className="text-md duration-700">Unlock Now</button>
              <FaArrowRight />
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
