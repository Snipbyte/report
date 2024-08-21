import React from 'react'
import HeroSection from '../components/simulationSummary/heroSection/page'
import AnalysisCard from '../components/simulationSummary/analysisCard/page'
import CircleChart from '../components/simulationSummary/circleChart/page'
import InvestmentCard from '../components/simulationSummary/investmentCard/page'
import Footer from '../components/common/footer/page'
import Header from '../components/common/header/page'


const SimulationSummary = () => {
    return (
        <div className='p-4'>
            <Header />
            <HeroSection />
            <div className='lg:flex block p-4 my-6 gap-5'>
                <div className='lg:w-1/2 w-full'>
                    <AnalysisCard />
                    <p className='text-2xl font-bold text-btnColor my-14'>Distribution of interest and capital</p>
                    <div className='h-60 bg-white shadow-2xl border p-2 rounded-md'>
                        <CircleChart />
                    </div>
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