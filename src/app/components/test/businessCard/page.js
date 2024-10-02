import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BusinessCard = (props) => {
    return (
        <div className='w-full bg-white p-5 h-[570px]  lg:w-[23%]'>
            <div className=''>
                <Image className='w-80 h-80' src={props.img} width={1000} height={1000} />
                <p className='text-2xl my-2 font-bold text-headingColor'>{props.heading}</p>
                <p className='text-paraColor text-md my-4'>{props.des}</p>
                <Link href="/landing-page" className='w-full text-center p-3 text-xl hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-md'>
                    Learn More
                </Link>
            </div>
        </div>
    )
}

export default BusinessCard