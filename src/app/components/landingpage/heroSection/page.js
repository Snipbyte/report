import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <div className='relative bg-desColor p-4 h-[500px] lg:rounded-b-[150px]'>
    <p className='lg:text-4xl text-2xl font-bold text-center text-white max-w-[90%] lg:max-w-[600px] mx-auto'>
        Boost Your Funding Prospects with IziKemp!
    </p>
    <p className='text-white lg:text-sm text-xs text-center max-w-[90%] lg:max-w-[600px] mx-auto my-5'>
        Access cutting-edge simulators and instantly generate personalized reports to assess your eligibility with banks and investment funds, accompanied by our expert guidance.
    </p>
    <div className='flex justify-center my-6'>
        <button className='w-36 lg:w-44 text-center p-2 bg-btnColor text-white hover:bg-hoverBtnColor rounded-md'>
            Schedule A Demo
        </button>
    </div>
    <div className='absolute -bottom-32 lg:-bottom-40 left-0 w-full flex justify-center'>
        <Image className='w-[90%] lg:w-[800px]' src="/images/pic1.png" width={1000} height={1000} />
    </div>
</div>


    )
}

export default HeroSection