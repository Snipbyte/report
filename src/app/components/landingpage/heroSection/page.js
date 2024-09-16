import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <div className="md:flex block items-center">
            <div className="relative lg:w-[50%] w-full h-full">
                <Image width={1000} height={1000}
                    src="/images/lp1.jpg"
                    alt="Analytics Image"
                    className="w-full lg:h-[500px] h-full object-cover opacity-100"
                />
                <div  className="absolute inset-0 bg-gradient-to-r from-transparent to-white"></div>
            </div>
            <div className="lg:w-[50%] w-full p-4 bg-white opacity-90">
                <h1 className="lg:text-5xl text-2xl w-full md:w-[500px] font-bold mb-4">Boost Your Funding Prospects with IziKemp!</h1>
                <p className="text-lg w-full md:w-[500px]">
                    Access cutting-edge simulators and instantly generate personalized
                    reports to assess your eligibility with banks and investment funds,
                    accompanied by our expert guidance.
                </p>
            </div>
        </div>
    )
}

export default HeroSection