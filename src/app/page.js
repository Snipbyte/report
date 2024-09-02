"use client";
import Header from "./components/common/header/page";
import Footer from "./components/common/footer/page";
import EntrepreneursCard from "./components/test/entrepreneursCard/page";
import HeroSection from "./components/landingpage/heroSection/page";
import SimulationCard from "./components/landingpage/simulationCard/page";
import SectionCard from "./components/landingpage/sectionCard/page";
import GuaidanceCard from "./components/landingpage/guaidanceCard/page";
import WorkCard from "./components/landingpage/workCard/page";
import ChooseCard from "./components/landingpage/chooseCard/page";
import AmbitionCard from "./components/landingpage/ambitionCard/page";
import Testimonials from "./components/landingpage/testimonials/page";


export default function Home() {
  return (
    <main className="overflow-hidden">
      <Header />
      <HeroSection />
      <SimulationCard />
      <SectionCard />
      <GuaidanceCard />
      <WorkCard />
      <ChooseCard />
      <p className='text-4xl text-center font-bold text-headingColor my-6'>Don’t let financing hold back your Ambitions</p>
      <AmbitionCard />
      <Testimonials/>
      <Footer />
    </main>
  );
}
