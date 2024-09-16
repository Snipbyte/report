import Image from 'next/image'
import React from 'react'

const ChooseCard = () => {
    return (
        <div className='lg:flex items-center block '>
            <div className='w-full  lg:w-[50%] bg-white p-10'>
                <p className='text-4xl font-bold text-headingColor my-6'>Why Choose IziKemp?</p>
                <p className='text-headingColor  text-lg mt-20 my-4'>- Accuracy and Trust: Our tools are based on recognized criteria, offering you a reliable analysis</p>
                <p className='text-headingColor  text-lg my-4'>- Customization and Support:
                    Each report is unique and tailored to your project, with personalized guidance. </p>
                <p className='text-headingColor  text-lg my-4'>- Dedicated Support: Our team is here to support you every step of the way.</p>
            </div>
            <div className="relative lg:w-[50%] w-full h-full">
                <Image width={1000} height={1000}
                    src="/images/lp4.jpg"
                    alt="Analytics Image"
                    className="w-full lg:h-[500px] h-full object-cover opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white"></div>
            </div>
        </div>
    )
}

export default ChooseCard