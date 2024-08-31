import React from 'react'
import HeroSection from '../components/test/heroSection/page'
import BusinessCard from '../components/test/businessCard/page'
import AmbitionCard from '../components/test/ambitionCard/page'
import PreneursCard from '../components/test/preneursCard/page'
import EntrepreneursCard from '../components/landingpage/entrepreneursCard/page'
import FaqCard from '../components/faq/faqCard/page'
import Footer from '../components/common/footer/page'
import Header from '../components/common/header/page'
import MainServiCars from '../components/test/mainServiceCard/page'
import MainServiceCard from '../components/test/mainServiceCard/page'

const Test = () => {
    return (
        <div className='p-2'>
            <Header />
            <HeroSection />
            <p className='lg:text-5xl text-2xl font-bold mt-20'>Why Entrepreneurs choose <span className='text-btnColor'> Legalstart</span></p>
            <PreneursCard />
            <div className='bg-lightCard'>
                <p className='lg:text-4xl text-2xl font-bold text-headingColor mt-20 py-4'>By your side,<span className='text-btnColor'> at every stage </span>of your business</p>
                <div className='flex flex-wrap items-center justify-around py-8'>
                    <BusinessCard img="/images/b1.jpg" heading="Business creation" des="Legal formalities, invoicing, accounting: we help you get started quickly and with complete peace of mind." />
                    <BusinessCard img="/images/b2.jpg" heading="Company modification" des="Is your business evolving? Meet your legal obligations by entrusting us with your formalities. Peace of mind guaranteed." />
                    <BusinessCard img="/images/b3.jpg" heading="Business Closure" des="When you need to turn the page, you can also count on us. We take care of your legal and accounting procedures." />
                </div>
            </div>
            <div className='my-4'>
                <p className='lg:text-4xl text-2xl font-bold text-headingColor mt-20'> <span className='text-btnColor'>Solid foundations </span> for great ambitions</p>
                <p className='text-paraColor text-xl my-2'>Build your project using our business creation support tools.</p>
                <div className='flex flex-wrap gap-1 items-center justify-around my-4'>
                    <AmbitionCard img="/images/t4.png" heading="Legal Status" des="Are you hesitating? Find the legal form that is suited to your project and your objectives." btn="Launch The Simulator" />
                    <AmbitionCard img="/images/t1.png" heading="Social Charges" des="Quickly estimate your expenses based on your company's income and your tax regime." btn="Estimate My Charges" />
                    <AmbitionCard img="/images/t2.png" heading="Business Plan" des="Download our business plan template and validate your project idea." btn="Download A Template" />
                    <AmbitionCard img="/images/t3.png" heading="Practicle Sheets" des="Find the answers to all your questions among our 3,000 practical sheets." btn="Browse The Card" />
                </div>
            </div>
            <div className='mt-20'>
                <EntrepreneursCard />
            </div>
            <FaqCard />
            <div>
                <p className='lg:text-5xl text-2xl font-bold text-headingColor mb-6'> Our Main<span className='text-btnColor'>  Services</span></p>
                <div className='flex flex-wrap items-center justify-center gap-5 mt-5 mb-10'>
                    <MainServiceCard heading="Creation" btn="Business Creation"/>
                    <MainServiceCard heading="Modification" btn="Statutory amendmenr"/>
                    <MainServiceCard heading="Management" btn="Business Management"/>
                    <MainServiceCard heading="Closing" btn="Business Closure"/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Test