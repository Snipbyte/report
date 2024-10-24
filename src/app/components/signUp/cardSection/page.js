import React from "react";
import StatsCard2 from "../../login/cardSection/statscard2/page";
import StatsCard3 from "../../login/cardSection/statsCard3/page";
import StatsCard4 from "../../login/cardSection/statscard4/page";
import StatsCard from "../../login/cardSection/statsCard/page";

const CardSection = () => {
  return (
    
      <div className="m-2 relative bg-gradient-to-tr from-btnColor via-hoverBtnColor to-headingColor w-full">
          <div className="flex gap-3 m-1 items-center justify-between p-2">
        <StatsCard />
        <StatsCard2 />
      </div>
      <div className="flex gap-3 m-1 items-center justify-between p-2">
        <StatsCard3 />
        <StatsCard4 />
      </div>
      </div>
    
  );
};

export default CardSection;
