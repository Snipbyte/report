import React from "react";
import HeroSection from "../heroSection/heroSection";
import SimulationCard from "../simulationCard/simulationCard";
import SectionCard from "../sectionCard/sectionCard";
import GuidanceCard from "../guidanceCard/guidanceCard";
import WorksCard from "../worksCard/worksCard";
import ChooseCard from "../chooseCard/chooseCard";
import AmbitionCard from "../ambitionCard/ambitionCard";
import Testimonials from "../testimonials/testimonials";

const LandingMainPage = () => {
  return (
    <div className="p-2">
      <HeroSection />
      <SimulationCard />
      <SectionCard />
      <GuidanceCard />
      <WorksCard />
      <ChooseCard />
      <AmbitionCard />
      <Testimonials />
      <button className="p-2 bg-btnColor hover:bg-hoverBtnColor duration-300 rounded text-white hover:rounded-lg">submit</button>
    </div>
  );
};

export default LandingMainPage;
