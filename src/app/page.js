import Image from "next/image";
import HeroSection from "./components/landingpage/heroSection/page";
import CircleChartCard from "./components/landingpage/circleChartCard/page";
import TrackerCard from "./components/landingpage/trackerCard/page";
import ImageCard from "./components/landingpage/imageCard/page";
import Header from "./components/common/header/page";
import Footer from "./components/common/footer/page";
import ContentSection from "./components/landingpage/contentSection/page";

export default function Home() {
  return (
    <main className="overflow-hidden">
  <Header />
  <HeroSection />
  
  <section className='mt-40 lg:mt-48 px-4'>
    <p className='text-4xl lg:text-5xl my-4 font-bold text-headingColor text-center'>Offer Overview</p>
    <div className="flex justify-center">
      <CircleChartCard />
    </div>
  </section>
  
  <section className="mt-12 lg:mt-24 px-4">
    <TrackerCard />
  </section>
  
  <section className="my-12 lg:my-24 px-4 text-center">
    <p className="text-3xl lg:text-4xl text-headingColor font-bold mx-auto mb-6 w-full lg:w-[450px]">
      Why Choose IziKemp?
    </p>
    <p className="text-sm text-paraColor mb-4">
      Discover Expert Solutions and Custom Strategies for Your Investment Success.
    </p>
    <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
      <ImageCard
        img="/images/image3.jpg"
        heading="- Accuracy and Trust"
        des="Our tools are based on recognized criteria, offering you a reliable analysis."
      />
      <ImageCard
        img="/images/image1.jpg"
        heading="- Customization and Support"
        des="Each report is unique and tailored to your project, with personalized guidance."
      />
      <ImageCard
        img="/images/image2.jpg"
        heading="- Dedicated Support"
        des="Our team is here to support you every step of the way."
      />
    </div>
  </section>
  
  <section className="mt-12 lg:mt-24 px-4">
    <ContentSection />
  </section>
  
  <Footer />
</main>


  );
}
