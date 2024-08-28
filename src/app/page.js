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
    <main className="">
      <Header/>
      <HeroSection />
      <div className='mt-48'>
        <p className='text-5xl my-4 font-bold text-headingColor text-center'>OfferOverview</p>
         <CircleChartCard />
      </div>
      <TrackerCard />
      <div>
         <p className="text-4xl text-headingColor font-bold text-center w-[450px] mx-auto mb-6">Why Choose IziKemp?</p>
         <p className="text-sm text-paraColor mb-4 text-center">Discover Expert Solutions and Custom Strategies for Your Investment Success.</p>
        <div className="flex my-4 p-6 justify-center gap-8">
          <ImageCard img="/images/image3.jpg" heading="- Accuracy and Trust" des="Our tools are based on recognized criteria, offering you a reliable analysis." />
          <ImageCard img="/images/image1.jpg" heading="- Customization and Support" des="Each report is unique and tailored to your project, with personalized guidance." />
          <ImageCard img="/images/image2.jpg" heading="- Dedicated Support" des="Team ishere to support youeverystep of the way." />
        </div>
      </div>
      <div className="">
        <ContentSection />
      </div>
      <Footer/>
    </main>
  );
}
