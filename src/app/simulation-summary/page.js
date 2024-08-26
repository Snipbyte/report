import React from 'react'
import Header from '../components/common/header/page'
import HeroSection from '../components/simulationSummary/heroSection/page'
import AnalysisCard from '../components/simulationSummary/analysisCard/page'
import CircleChart from '../components/common/Charts/circleChart/page'
import Footer from '../components/common/footer/page'
import InvestmentCard from '../components/simulationSummary/investmentCard/page'
import { FaPlus } from 'react-icons/fa'
import BarChart from '../components/common/Charts/BarChart/page'


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
            <div className='my-6'>
                <p className='lg:text-2xl text-xl text-center bg-desColor p-2 font-bold text-btnColor '>Summary of your investment over 10 years</p>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>

                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border border-gray-200">Year</th>
                                {[...Array(11)].map((_, index) => (
                                    <th
                                        key={index}
                                        className="px-4 py-2 text-left text-sm font-medium text-gray-600 border border-gray-200"
                                    >

                                        {2024 + index}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="even:bg-gray-100">
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">Payments</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">27,000</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">6,000</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">4,000</td>
                            </tr>
                            <tr className="even:bg-gray-100">
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">Financial products</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">209</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">972</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">1,199</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">1,433</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">1,674</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">1,923</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">2,180</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">2,446</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">2,720</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">3,003</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">2,164</td>
                            </tr>
                            <tr className="even:bg-gray-100">
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">Available capital</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">27,209</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">34,181</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">41,380</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">48,812</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">56,486</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">64,409</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">72,590</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">81,036</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">89,756</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">98,759</td>
                                <td className="px-4 py-2 text-sm text-headingColor border border-gray-200">104,924</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <BarChart />
                <div className='flex items-center'>
                    <p className='lg:text-2xl text-xl w-full bg-desColor p-2 font-bold text-btnColor '>Detaills of the evolution of your investment over 10 years</p>
                    <FaPlus className='w-10 h-12 bg-btnColor text-white hover:bg-hoverBtnColor p-2' />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SimulationSummary