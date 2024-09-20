import React from "react";
import HeroSection from "../components/about/heroSection/page";
import ContentSection from "../components/about/contentSection/page";
import DemoSection from "../components/about/demoSection/page";
import ContactSection from "../components/about/contactSection/page";
import Header from "../components/common/header/page";
import Footer from "../components/common/footer/page";

const About = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <ContentSection />
      <div className="my-2">
        <DemoSection />
      </div>
      {/* <ContactSection/> */}
      <Footer />
    </div>
  );
};

export default About;
