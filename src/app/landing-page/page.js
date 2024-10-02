"use client";


import { useTranslation } from "react-i18next";
import Header from "../components/common/header/page";
import SimulationCard from "../components/landingpage/simulationCard/page";
import HeroSection from "../components/landingpage/heroSection/page";
import SectionCard from "../components/landingpage/sectionCard/page";
import GuaidanceCard from "../components/landingpage/guaidanceCard/page";
import WorkCard from "../components/landingpage/workCard/page";
import ChooseCard from "../components/landingpage/chooseCard/page";
import AmbitionCard from "../components/landingpage/ambitionCard/page";
import Testimonials from "../components/landingpage/testimonials/page";
import Footer from "../components/common/footer/page";


export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="overflow-hidden">
      <Header />
      <div>
        <HeroSection />
        <SimulationCard />
        <SectionCard />
        <GuaidanceCard />
        <WorkCard />
        <ChooseCard />
        <p className="text-4xl text-center font-bold text-headingColor my-6">
        {t("financingAmbitions")}
        </p>
        <AmbitionCard />
        <Testimonials />
      </div>
      <Footer />
    </main>
  );
}