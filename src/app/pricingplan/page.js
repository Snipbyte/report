import React from "react";
import PricingCards from "../components/pricingPlan/pricingCards/page";
import Header from "../components/common/header/page";
import Footer from "../components/common/footer/page";

const PricingPlan = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-wrap justify-center items-center">
        <PricingCards
          num="€9.90"
          des="Starter"
          point1="Report with the possibility of making up to three modifications"
          point2="Access to an online consultant to assist you in presenting your application"
          isPopular={false}
          productlink={"https://buy.stripe.com/test_bIY9AE2qk2MVgKs3ch"}
        />
        {/* <PricingCards num="$39" des="Base" point1="Everything in Simple" point2="512GB of buisness storage" point3="Unlimited management" point4="Unlimited collaboration" point5="Links with password protection" isPopular={false} productlink={"https://buy.stripe.com/test_7sI28cfd6fzH2TC6oq"} /> */}
        <PricingCards
          num="€39.90"
          des="Unlimited"
          point1="Access to unlimited modifications and reports"
          point2="Receive three free consultations with our consultants"
          isPopular={true}
          productlink={"https://buy.stripe.com/test_aEU7sw4ysafn79S5kq"}
        />
        {/* <PricingCards num="$199" des="Enterprise" point1="Everything is available" point2="no more apologizes" point3="Unlimited packages" point4="store up to unlimited buisness" point5="all awarness" isPopular={false} productlink={"https://buy.stripe.com/test_bIY5kogha5Z765ObIM"} />  */}
      </div>
      <Footer />
    </div>
  );
};

export default PricingPlan;
