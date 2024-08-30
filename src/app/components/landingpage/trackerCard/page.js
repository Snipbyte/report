import Image from 'next/image'
import React from 'react'

const TrackerCard = () => {
    return (
        <div>
        <div className='lg:flex block items-center justify-between px-4 lg:px-20'>
            <div className='lg:w-1/2 w-full mb-4 lg:mb-0'>
                <p className='text-3xl lg:text-5xl font-bold text-headingColor'>Call to Action (CTA)</p>
                <p className='text-xl lg:text-3xl font-bold my-2 text-btnColor'>IziKemp</p>
            </div>
            <div className='lg:w-1/2 w-full'>
                <p className='text-sm lg:text-lg mb-4 lg:mb-0'>
                    Don’t let financing hold back your ambitions. Try IziKemp, generate your report instantly, and discuss with an expert today!
                </p>
                <div className='flex lg:flex-nowrap flex-wrap my-4 items-center gap-2'>
                    <input 
                        className='outline-none border text-paraColor p-2 w-full lg:w-[70%]' 
                        type='text' 
                        placeholder='Enter Your Email' 
                    />
                    <button 
                        className='bg-btnColor text-white hover:duration-700 hover:bg-hoverBtnColor p-2 lg:w-[30%] w-full'>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
        {/* <Image 
            className='w-full p-4 lg:p-[40px] lg:h-[600px] h-auto' 
            src="/images/manimage.jpg" 
            width={1000} 
            height={1000} 
            alt="Man Image" 
        /> */}
    </div>
    
    )
}

export default TrackerCard