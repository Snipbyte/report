import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <div className='md:flex block items-center mb-8 p-5 '>
            <div className='md:w-[65%] w-full'>
                <p className='md:text-5xl text-2xl mx-auto  font-bold text-headingColor'>All you wanted to know about working with designers and creating delightful product experiences.</p>
            </div>
            <div>
                <Image className='w-full h-72' src="/images/cartoon.png" width={1000} height={1000} />
            </div>
        </div>
    )
}

export default HeroSection