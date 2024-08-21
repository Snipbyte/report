import Image from 'next/image'
import React from 'react'

const TrackerCard = () => {
    return (
        <div>
            <div className='lg:flex block items-center justify-between px-20'>
                <div className='lg:w/1/2 w-full '>
                    <p className='text-4xl font-bold text-headingColor'>The ultimate All-in One Automatic</p>
                    <p className='text-3xl font-bold my-2 text-btnColor'>Time Tracker</p>
                </div>
                <div className='lg:w/1/2 w-full'>
                    <p>Time tracking software use by a millions. A single time tracker and timesheet app that lets you track work hours across projects....</p>
                    <div className='flex lg:flex-nowrap flex-wrap my-4 items-center gap-2'>
                        <input className='outline-none border text-paraColor p-2 w-full lg:w-[70%]' type='text' placeholder='Enter Your Email' />
                        <button className='bg-btnColor text-white hover:bg-hoverBtnColor p-2 text-clip lg:w-[30%] w-full'>Get Started</button>
                    </div>
                </div>
            </div>
            <Image className='w-full p-5 lg:p-[40px] h-[700px]' src="/images/manimage.jpg" width={1000} height={1000} />
        </div>
    )
}

export default TrackerCard