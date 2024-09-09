import Image from 'next/image'
import React from 'react'

const ChooseCard = () => {
    return (
        <div className='lg:flex block '>
            <div className='w-full  lg:w-[50%] bg-white shadow-2xl p-10'>
                <p className='text-4xl font-bold text-headingColor my-6'>Why Choose IziKemp?</p>
                <p className='text-headingColor  text-lg mt-20 my-4'>- Accuracy and Trust: Our tools are based on recognized criteria, offering you a reliable analysis</p>
                <p className='text-headingColor  text-lg my-4'>- Customization and Support:
                    Each report is unique and tailored to your project, with personalized guidance. </p>
                <p className='text-headingColor  text-lg my-4'>- Dedicated Support: Our team is here to support you every step of the way.</p>
            </div>
            <div className='w-full lg:w-[50%]'>
                <Image className='w-full lg:h-full h-[300px]' src="/images/lp4.jpg" width={1000} height={1000} />
            </div>
        </div>
    )
}

export default ChooseCard