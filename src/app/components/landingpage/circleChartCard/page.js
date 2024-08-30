import React from 'react'
import CircleChart from '../../common/Charts/circleChart/page'
import { GrOptimize } from "react-icons/gr";
import { RiAiGenerate } from "react-icons/ri";
import { MdOutlineAssessment } from 'react-icons/md';




const CircleChartCard = () => {
    return (
        <div className='lg:flex block gap-5 items-center justify-center'>
            <div className='lg:w-[35%] w-full flex justify-center lg:justify-end mb-8 lg:mb-0'>
                <CircleChart />
            </div>
            <div className='lg:w-{65%} w-full p-4 lg:p-7'>
                <p className='text-lg text-paraColor'>
                    At IziKemp, we understand the needs of entrepreneurs and project leaders. Our suite of innovative simulators provides you with the necessary tools to
                </p>
                <div className='flex items-center gap-5 my-4'>
                    <MdOutlineAssessment className='w-12 h-12 bg-lightCard p-3 text-desColor rounded-full items-center justify-center flex' />
                    <div>
                        <p className='font-bold text-2xl'>Scoring</p>
                        <p className='text-paraColor text-lg my-1'>Assess your funding eligibility with precise scoring based on bank and investment fund criteria.</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 my-4'>
                    <GrOptimize className='w-12 h-12 bg-lightCard p-3 text-desColor rounded-full items-center justify-center flex' />
                    <div>
                        <p className='font-bold text-2xl'>Investments</p>
                        <p className='text-paraColor text-lg my-1'>Explore various investment options to optimize your project.</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 my-4'>
                    <RiAiGenerate className='w-12 h-12 bg-lightCard p-3 text-desColor rounded-full items-center justify-center flex' />
                    <div>
                        <p className='font-bold text-2xl'>Forecasting</p>
                        <p className='text-paraColor text-lg my-1'>Easily and instantly generate the financial elements of your business plan.</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CircleChartCard