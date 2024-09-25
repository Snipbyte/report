import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <div className='md:flex block items-center mb-8 p-5 '>
            <div className='md:w-[65%] w-full'>
                <p className='md:text-5xl text-2xl mx-auto  font-bold text-headingColor'>Welcome to our blog page, where we share the latest insights, tips, and stories to inspire and inform you on your journey!</p>
            </div>
            <div>
                <Image className='w-full h-72' src="/images/cartoon.png" width={1000} height={1000} />
            </div>
        </div>
    )
}

export default HeroSection