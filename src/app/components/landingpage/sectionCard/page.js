import Image from 'next/image'
import React from 'react'

const SectionCard = () => {
    return (
        <div className='lg:flex block items-center my-10'>
            <div className="relative lg:w-[50%] w-full h-full">
                <Image width={1000} height={1000}
                    src="/images/lp3.jpg"
                    alt="Analytics Image"
                    className="w-full lg:h-[500px] h-full object-cover opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white"></div>
            </div>
            <div className="lg:w-[50%] w-full p-4 bg-white opacity-90">
                {/* <p className='text-4xl font-bold text-headingColor my-6'>Section 1</p> */}
                <p className='text-headingColor w-full md:w-[500px] text-lg my-8'>At IziKemp, we understand the needs of entrepreneurs and project leaders. Our suite of innovative simulators provides you with the necessary tools to:</p>
                <p className='text-headingColor w-full md:w-[500px] text-lg my-8'>- Assess your funding eligibility with precise scoring based on bank and investment fund criteria.</p>
                <p className='text-headingColor w-full md:w-[500px] text-lg my-8'>- Explore various investment options to optimize your project. - Easily and instantly generate the financial elements of your business plan.</p>
            </div>
        </div>
    )
}

export default SectionCard