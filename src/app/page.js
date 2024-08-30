import Image from "next/image";
import HeroSection from "./components/landingpage/heroSection/page";
import CircleChartCard from "./components/landingpage/circleChartCard/page";
import TrackerCard from "./components/landingpage/trackerCard/page";
import ImageCard from "./components/landingpage/imageCard/page";
import Header from "./components/common/header/page";
import Footer from "./components/common/footer/page";
import ContentSection from "./components/landingpage/contentSection/page";
import ServiceCard from "./components/landingpage/serviceCard/page";
import EntrepreneursCard from "./components/landingpage/entrepreneursCard/page";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Header />
      <HeroSection />

      <section className='mt-40 lg:mt-60 px-4'>
        <p className='text-4xl lg:text-7xl my-4 font-bold text-headingColor text-center'>Offer Overview</p>
        <div className="flex justify-center">
          <CircleChartCard />
        </div>
      </section>
      <p className="text-4xl lg:text-7xl mb-10 mt-6 font-bold text-headingColor text-center">Our Services</p>
      <div className="flex flex-wrap items-center p-2 lg-p-0 justify-center gap-12">
        <ServiceCard image="financingsimulators.jpg" heading="Financing Simulators" />
        <ServiceCard image="businessplangenerator.jpg" heading="Business Plan Generator" />
        <ServiceCard image="expertguidance.jpg" heading="Expert Guidance" />
        <ServiceCard image="howitworks.jpg" heading="How It Works" />
      </div>

      <section className="my-12 lg:my-24 px-4 text-center">
        <p className="text-3xl lg:text-6xl text-headingColor font-bold mx-auto mb-6 w-full lg:w-[800px]">
          Why Choose <span className="text-btnColor"> IziKemp?</span>
        </p>
        <p className="text-lg text-paraColor mb-4">
          Discover Expert Solutions and Custom Strategies for Your Investment Success.
        </p>
        <div className="flex flex-wrap w-full justify-center gap-4 lg:gap-6">
          <ImageCard
            img="/images/image3.jpg"
            heading="- Personalized Reports"
            des="Receive detailed analyses and specific recommendation stailored to your project with just a few clicks."
          />
          <ImageCard
            img="/images/image1.jpg"
            heading=" Advanced Scoring"
            des="Instantly evaluate your funding potential using our algorithms based on bank and investor criteria."
          />
          <ImageCard
            img="/images/image2.jpg"
            heading="- Free Consultation"
            des="Benefit from a complimentary session with our experts to refine your financial strategy."
          />
        </div>
        <div>
          <p className="text-headingColor text-lg text-center my-4">Start your personalized simulation today and pave the way to success!</p>
          <button className='w-60 text-center p-3 text-xl hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-md'>
            Start Your Simulation
          </button>
        </div>
      </section>
      <div className="p-3 border hidden lg:block ">
        <EntrepreneursCard />
      </div>
      <section className=" px-4">
        <ContentSection />
      </section>
      <section className="mt-12 lg:mt-24 px-4">
        <TrackerCard />
      </section>
      <Footer />
    </main>


  );
}
