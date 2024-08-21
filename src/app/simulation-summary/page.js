import React from 'react'
import HeroSection from '../components/simulationSummary/heroSection/page'
import AnalysisCard from '../components/simulationSummary/analysisCard/page'
import InvestmentCard from '../components/simulationSummary/investmentCard/page'
import Footer from '../components/common/footer/page'
import Header from '../components/common/header/page'


const SimulationSummary = () => {
    return (
        <div className='p-4'>
            <Header />
            <HeroSection />
            <div className='lg:flex block p-4 my-6 gap-5'>
                <div className='w-full'>
                    <AnalysisCard />
                    <p className='text-2xl font-bold text-btnColor my-14'>Distribution of interest and capital</p>
                   
                </div>
                <div className='lg:w-1/2 w-full'>
                    <InvestmentCard />
                    <button className='text-headingColor text-sm w-full text-end my-2'>Learm more about the use of my personal data</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default SimulationSummary