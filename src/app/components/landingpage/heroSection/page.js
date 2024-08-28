import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <div className='relative bg-desColor p-4 h-[500px]  lg:rounded-b-[150px]'>
            <p className='lg:text-4xl text-2xl font-bold text-center text-white w-[600px] mx-auto'>Boost Your Funding Prospects with IziKemp!</p>
            <p className='text-white lg:text-sm text-xs text-center w-[600px] mx-auto my-5'>Access cutting-edges imulators and instantly generate personalized reports to assess youre eligibility with banks and investmentfunds, accompanied by our expert guidance.</p>
            <div className='flex justify-center my-6'>
                <button className='w-44 text-center p-2 bg-btnColor text-white hover:bg-hoverBtnColor rounded-md'>Schedule A Demo</button>
            </div>
            <div className='absolute -bottom-40 left-0 w-full flex justify-center'>
                <Image className='w-[800px]' src="/images/pic1.png" width={1000} height={1000} />
            </div>
        </div>

    )
}

export default HeroSection