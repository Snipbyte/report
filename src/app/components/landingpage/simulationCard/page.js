import Image from 'next/image'
import React from 'react'

const SimulationCard = () => {
    return (
        <div className='my-10 relative'>
            <div className='lg:flex block '>
                <div className='w-full  lg:w-[50%] bg-desColor shadow-2xl p-10'>
                    <div className='w-14 h-1.5 bg-btnColor mt-10 mb-20'></div>
                    <div className='w-80 h-0.5 bg-white'></div>
                    <p className='text-white lg:w-96 w-full text-lg mt-20'>Instantly access personalized reports and tailored recommendations with IziKemp. Save time, cut costs, and maximize your funding opportunities in just a few clicks!</p>
                </div>
                <div className="relative lg:w-[50%] w-full h-full">
                <Image width={1000} height={1000}
                    src="/images/lp2.jpg"
                    alt="Analytics Image"
                    className="w-full lg:h-[500px] h-full object-cover opacity-100"
                />
                <div  className="absolute inset-0 bg-gradient-to-l from-transparent to-desColor"></div>
            </div>
            </div>
            <button className='absolute bottom-10  lg:left-[500px] left-4 flex justify-center w-60 text-center p-4 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full'>
                Start Your Simulation
            </button>
        </div>
    )
}

export default SimulationCard