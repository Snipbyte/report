import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <div className='lg:flex block my-10'>
            <div className='w-full lg:w-[50%]'>
                <Image className='w-full lg:h-[500px] h-[300px]' src="/images/lp1.jpg" width={1000} height={1000} />
            </div>
            <div className='w-full  lg:w-[50%] bg-white  p-10'>
                <p className='text-4xl font-bold text-headingColor my-6'>Boost Your Funding Prospects with IziKemp!</p>
                <p className='text-headingColor text-lg my-8'>Access cutting-edge simulators and instantly generate personalized reports to assess your eligibility with banks and investment funds, accompanied by our expert guidance.</p>
            </div>
        </div>
    )
}

export default HeroSection