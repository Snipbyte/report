import React from 'react'
import CircleChart from '../../common/Charts/circleChart/page'
import { GrOptimize } from "react-icons/gr";
import { RiAiGenerate } from "react-icons/ri";
import { MdOutlineAssessment } from 'react-icons/md';




const CircleChartCard = () => {
    return (
        <div className='lg:flex block gap-5 items-center justify-center'>
            <div className='lg:w-1/2 w-full flex justify-end' >
                <CircleChart />
            </div>
            <div className='lg:w-1/2 w-full p-7'>
                <p className='text-sm text-paraColor'>At IziKemp, we understand the needs of entrepreneurs and project leaders. Our suite of innovative simulators provides you with the necessary tools to</p>
                <div className='flex items-center gap-5 my-4'>
                    <MdOutlineAssessment className='w-10 h-10 bg-lightCard p-3 text-desColor rounded-full items-center justify-center flex ' />
                    <div>
                        <p className='font-bold'>Scoring</p>
                        <p className='text-paraColor text-sm my-1'>Assess your funding eligibility with precises coring based on bank and investment fund criteria.</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 my-4'>
                    <GrOptimize className='w-10 h-10 bg-lightCard p-3 text-desColor rounded-full items-center justify-center flex ' />
                    <div>
                        <p className='font-bold'>Investments</p>
                        <p className='text-paraColor text-sm my-1'>Explore various investment options to optimize your project.</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 my-4'>
                    <RiAiGenerate className='w-10 h-10 bg-lightCard p-3 text-desColor rounded-full items-center justify-center flex ' />
                    <div>
                        <p className='font-bold'>Forecasting</p>
                        <p className='text-paraColor text-sm my-1'>Easily and instantly generate the financial elements of your business plan.</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default CircleChartCard