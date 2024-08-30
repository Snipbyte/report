import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <div className='relative bg-desColor p-4 h-[580px] lg:rounded-b-[150px]'>
            <p className='lg:text-6xl text-2xl font-bold text-center text-white max-w-[90%] lg:max-w-[800px] mx-auto'>
                Ignite Your Entrepreneurial Ambition with <span className='text-btnColor'> IziKemp!</span>
            </p>
            <p className='text-white lg:text-lg text-xs text-center max-w-[90%] lg:max-w-[700px] mx-auto my-5'>
                Turn your entrepreneurial dream into reality with the help of our smart tools and dedicated experts. At IziKemp, we simplify the funding process, providing tailored solutions that give you the edge in securing finances.
            </p>
            <div className='flex justify-center my-6'>
                <button className='w-36 lg:w-56 text-center p-3 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-md'>
                    Schedule A Demo
                </button>
            </div>
            <div className='absolute -bottom-32 lg:-bottom-56 left-0 w-full flex justify-center'>
                <Image className='w-[90%] lg:w-[800px]' src="/images/pic1.png" width={1000} height={1000} />
            </div>
        </div>


    )
}

export default HeroSection