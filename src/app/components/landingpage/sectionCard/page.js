import Image from 'next/image'
import React from 'react'

const SectionCard = () => {
    return (
        <div className='lg:flex block my-10'>
            <div className='w-full lg:w-[50%]'>
                <Image className='w-full lg:h-full h-[300px]' src="/images/lp3.jpg" width={1000} height={1000} />
            </div>
            <div className='w-full  lg:w-[50%] bg-white shadow-2xl p-10'>
                {/* <p className='text-4xl font-bold text-headingColor my-6'>Section 1</p> */}
                <p className='text-headingColor text-lg my-8'>At IziKemp, we understand the needs of entrepreneurs and project leaders. Our suite of innovative simulators provides you with the necessary tools to:</p>
                <p className='text-headingColor text-lg my-8'>- Assess your funding eligibility with precise scoring based on bank and investment fund criteria.</p>
                <p className='text-headingColor text-lg my-8'>- Explore various investment options to optimize your project. - Easily and instantly generate the financial elements of your business plan.</p>
            </div>
        </div>
    )
}

export default SectionCard