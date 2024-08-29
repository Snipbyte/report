import React from "react";
import StatsCard2 from "../../login/cardSection/statscard2/page";
import StatsCard3 from "../../login/cardSection/statsCard3/page";
import StatsCard4 from "../../login/cardSection/statscard4/page";
import StatsCard from "../../login/cardSection/statsCard/page";

const CardSection = () => {
  return (
    
      <div className=" relative bg-gradient-to-tr from-btnColor via-hoverBtnColor to-headingColor md:w-1/2 p-20 w-full">
        <StatsCard />
         <StatsCard2 />
        {/* <StatsCard3 />
        <StatsCard4 /> */}
      </div>
    
  );
};

export default CardSection;
