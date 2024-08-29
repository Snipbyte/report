import React from "react";
import LineChart from "../../common/Charts/lineChart/page";
import Image from "next/image";
import StatsCard from "./statsCard/page";
import StatsCard2 from "./statscard2/page";
import StatsCard3 from "./statsCard3/page";
import StatsCard4 from "./statscard4/page";

const CardSection = () => {
  return (
    <div className="m-2 bg-gradient-to-tr from-btnColor via-hoverBtnColor to-headingColor w-full">
      <div className="flex m-1 items-center justify-between p-2">
        <StatsCard />
        <StatsCard2 />
      </div>
      <div className="flex m-1 items-center justify-between p-2">
        <StatsCard3 />
        <StatsCard4 />
      </div>

    </div>
  );
};

export default CardSection;
