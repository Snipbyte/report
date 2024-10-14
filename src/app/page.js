"use client";
import React from "react";

import { useTranslation } from "react-i18next";
import Header from "./components/common/header/page";
import PreneursCard from "./components/test/preneursCard/page";
import BusinessCard from "./components/test/businessCard/page";
import HeroSection from "./components/test/heroSection/page";
import AmbitionCard from "./components/test/ambitionCard/page";
import EntrepreneursCard from "./components/test/entrepreneursCard/page";
import MainServiceCard from "./components/test/mainServiceCard/page";
import Footer from "./components/common/footer/page";
import Link from "next/link";

const Test = () => {
  const { t } = useTranslation();

  return (
    <div className="p-2">
      <Header />
      <HeroSection />
      <p className="lg:text-5xl text-2xl font-bold mt-20">
        {t("whyChooseIziKempfinal")}
      </p>
      <PreneursCard />
      <div className="bg-lightCard">
        <p className="lg:text-4xl text-2xl font-bold text-headingColor mt-20 py-4">
          {t("startSimulationTodayfinal")}
        </p>
        <div className="flex justify-center gap-2">
          <Link
            href="/calculator"
            className="mt-4 mb-2 w-60 text-center p-4 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full my-4"
          >
            {t("startSimulation")}
          </Link>
        </div>
     
      </div>
      <div className="my-4">
        <p className="lg:text-4xl text-2xl font-bold text-headingColor mt-20">
          {" "}
          {t("businessPlanGeneratorfinal")}
        </p>
        <p className="text-paraColor text-xl my-2">
          {t("buildBusinessPlanfinal")}{" "}
        </p>
        <div className="flex flex-wrap gap-1 items-center justify-center my-4">
          <AmbitionCard
            img="/images/t4.png"
            heading={`${t("businessPlanGeneratorfinal")}`}
            des={`${t("simplificationPrecisionfinal")}`}
            btn={`${t("generate")}`}
          />
          <AmbitionCard
            img="/images/t1.png"
            heading={`${t("businessPlanGeneratorfinal")}`}
            des={`${t("insightfulAnalysisfinal")}`}
            btn={`${t("generate")}`}
          />
           <AmbitionCard
            img="/images/t1.png"
            heading={`${t("businessPlanGeneratorfinal")}`}
            des={`${t("freeConsultationfinal")}`}
            btn={`${t("generate")}`}
          />
          
        </div>
      </div>
      <div className="mt-20">
        <EntrepreneursCard />
      </div>
      {/* <FaqCard /> */}
      <div>
        <p className="my-5 lg:text-5xl text-2xl font-bold text-headingColor mb-6">
          {" "}
          {t("ourServicesfinal")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5 mt-5 mb-10">
          <MainServiceCard
            heading={`${t("financingSimulatorsfinal")}`}
            service1={`${t("speedEfficiencyfinal")}`}
            service2={`${t("speedEfficiencyfinal")}`}
            service3={`${t("personalizedRecommendationsfinal")}`}
            btn={`${t("learnMore")}`}
          />
          <MainServiceCard
            heading={`${t("businessPlanGeneratorfinal")}`}
            service1={`${t("buildBusinessPlanfinal")}`}
            service2={`${t("simplificationPrecisionfinal")}`}
            service3={`${t("insightfulAnalysisfinal")}`}
            btn={`${t("learnMore")}`}
          />
          <MainServiceCard
            heading={`${t("expertGuidancefinal")}`}
            service1={`${t("meetOurTeamfinal")}`}
            service2={`${t("freeConsultationGuidancefinal")}`}
            service3={`${t("tailoredExpertisefinal")}`}
            btn={`${t("learnMore")}`}
          />
          <MainServiceCard
            heading={`${t("generate")}`}
            service1={`${t("iziKempOffersfinal")}`}
            service2={`${t("iziKempOffersfinal")}`}
            service3={`${t("iziKempOffersfinal")}`}
            btn={`${t("learnMore")}`}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Test;
