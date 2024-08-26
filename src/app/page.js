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
        <p className='text-2xl my-4 font-bold text-headingColor text-center'>The Rise of the Deskless WorkForce</p>
        <CircleChartCard />
      </div>
      <TrackerCard />
      <div>
         <p className="text-3xl text-headingColor font-bold text-center w-[450px] mx-auto mt-6 mb-2">A single time tracking app for desktops and mobile phones.</p>
        <p className="text-xs text-paraColor text-center">A single time tracker and timesheet app that lets you track work hours across projects.</p>
        <div className="flex my-4 items-center justify-center gap-8">
          <ImageCard img="/images/image3.jpg" heading="Collaboration Teams" des="You can handle project together with team easily." />
          <ImageCard img="/images/image1.jpg" heading="Cloud Storage" des="You can handle project together with team easily." />
          <ImageCard img="/images/image2.jpg" heading="Data Analytic" des="You can handle project together with team easily." />
        </div>
      </div>
      <div className="">
        <ContentSection />
      </div>
      <Footer/>
    </main>
  );
}
