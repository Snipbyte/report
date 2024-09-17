import Image from "next/image";
import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
const ContentSection = () => {
  return (
    <div>
      <h3 className="lg:text-5xl text-2xl w-[600px] mx-auto font-bold text-center mt-10">
      Your Trusted Partner in Financing
            </h3>
      <p className="text-lg text-paraColor text-center mt-4 w-[900px] mx-auto">
      IziKemp was born from the shared experience of a group of passionate entrepreneurs, each having navigated the challenges and uncertainties that come with starting a business. Our founders, once lost in the maze of financing and strategic planning, decided to create a solution that truly speaks to entrepreneurs.
      </p>
      <div className="flex items-center justify-center gap-10 p-10 mt-10">
  <div>
   
  </div>
  <div>
    <h2 className="text-4xl font-bold">Empowering Entrepreneurs</h2>
    <p className="text-md text-paraColor mt-4">
      As entrepreneurs themselves, they know how difficult it can be to find the right information at the right time.
      Each of their past ventures reinforced their belief that a lack of access to reliable and personalized advice
      can be costly, not only financially but also in terms of time and missed opportunities.
    </p>
    <p className="text-md text-paraColor mt-4">
      With this vision, they assembled a team of experts, combining their varied skills and passion for helping other
      creators. At IziKemp, we firmly believe that every business deserves to succeed without being hindered by
      administrative or financial obstacles. Our mission is to make entrepreneurs' lives easier. We are committed to
      providing personalized recommendations and effective strategies, allowing our users to dedicate more time to what
      truly matters: growing and thriving their business.
    </p>
    <p className="text-md text-paraColor mt-4">
      With IziKemp, you have a partner who not only understands your challenges but also strives constantly to solve them
      with expertise and empathy. We are here to support you every step of the way, turning complexities into clarity and
      challenges into opportunities.
    </p>
    <p className="text-md text-paraColor mt-4">
      Choose IziKemp, and move forward with the confidence of knowing you have a team of dedicated experts by your side.
    </p>
  </div>
</div>

<div className="flex items-center justify-center gap-10 p-10 mt-10">
  <div>
    <Image className="w-[400px] rounded-md" src="/images/contentdashboard2.png" width={500} height={500} />
  </div>
</div>

    </div>
  );
};

export default ContentSection;
