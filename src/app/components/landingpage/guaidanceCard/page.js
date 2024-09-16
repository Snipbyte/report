import Image from 'next/image'
import React from 'react'

const GuaidanceCard = () => {
    return (
        <div className='lg:flex block '>
            <div className='w-full lg:h-[500px] h-full lg:w-[50%] bg-white p-10'>
                <p className='text-4xl font-bold text-headingColor my-2'>Expert Guidance:</p>
                <div className='w-full h-1.5 bg-btnColor my-10'></div>
                <p className='text-headingColor  text-md my-4'>In addition to our advanced technological tools, benefit from our team’s expertise:</p>
                <p className='text-headingColor  text-md my-4'>-Banking Experts: Gain insights on best practices for presenting your project to banks. </p>
                <p className='text-headingColor  text-md my-4'>- Financing Specialists: Discover funding opportunities tailored to your specific needs. </p>
                <p className='text-headingColor  text-md my-4'>- Insurance Professionals: Ensure your project is secured and compliant with investor requirements. </p>
                <p className='text-headingColor  text-md my-4'>Each user receives a complimentary consultation with one of our experts to better steer their project.</p>
            </div>
            <div className='w-full lg:w-[50%]'>
                <Image className='w-full lg:h-[500px] h-full' src="/images/capture5.jpeg" width={1000} height={1000} />
            </div>
        </div>
    )
}

export default GuaidanceCard