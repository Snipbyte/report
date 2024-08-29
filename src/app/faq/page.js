import React from "react";
import FaqCard from "../components/faq/faqCard/page";
// import Breadcrumb from "../components/common/breadCrumb/page";
import Header from "../components/common/header/page";
import Footer from "../components/common/footer/page";

const Faq = () => {
  return (
    <div>
      <Header />
      {/* <Breadcrumb pageName="FAQ" pageLink="/faq" /> */}

       <FaqCard />
      <Footer />
    </div>
  );
};

export default Faq;
