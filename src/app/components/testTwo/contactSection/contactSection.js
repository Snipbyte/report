import Image from 'next/image'
import React from 'react'

const ContactSection = () => {
    return (
        <div>
            <Image className='w-full' src="/images/contact2.jpg" width={1000} height={1000} />
            <div className='lg:flex block items-center my-8'>
                <div className='w-full lg:w-[40%] text-headingColor font-bold text-2xl text-center mb-2 lg:mb-0'>
                    <p>Contact</p>
                </div>
                <div className='w-1 h-20 bg-orange-500 mr-28 hidden lg:block'></div>
                <div className='w-full text-xs md:text-sm lg:text-md lg:w-[60%] text-headingColor p-2'>
                    <p>• We’re Here to Help</p>
                    <p>• For any inquiries or specific issues, feel free to contact us via our form or
                        on social media. Join our dynamic community of successful entrepreneurs!</p>
                </div>
            </div>
        </div>
    )
}

export default ContactSection