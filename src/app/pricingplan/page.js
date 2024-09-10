import React from "react";
import PricingCards from "../components/pricingPlan/pricingCards/page";
import Header from "../components/common/header/page";
import Footer from "../components/common/footer/page";

const PricingPlan = () => {
  return (
    <div>
      <Header/>
      <div className="flex flex-wrap justify-center items-center">
        <PricingCards num="$19" des="Intro" point1="Store up to 20 buisness" point2="2 collaborites" point3="Unlimited collaboration" point4="End to end encyprtion" point5="Mac,pc,Andriod,ios, and Browser" isPopular={false} />
        <PricingCards num="$39" des="Base" point1="Everything in Simple" point2="512GB of buisness storage" point3="Unlimited management" point4="Unlimited collaboration" point5="Links with password protection" isPopular={false} />
        <PricingCards num="$99" des="Popular" point1="Everything in efficient" point2="Unlimited team members " point3="Custom storage plan" point4="White label branding" point5="five collaboraties " isPopular={true} />
        <PricingCards num="$199" des="Enterprise" point1="Everything is available" point2="no more apologizes" point3="Unlimited packages" point4="store up to unlimited buisness" point5="all awarness" isPopular={false} />
      </div>
      <Footer/>
    </div>
  );
};

export default PricingPlan;
