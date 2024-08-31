import Image from 'next/image'
import React from 'react'

const BusinessCard = (props) => {
    return (
        <div className='w-full lg:w-[30%]'>
            <div className='bg-white shadow-2xl rounded-xl p-4'>
                <Image className='w-80 h-80' src={props.img} width={1000} height={1000} />
                <p className='text-2xl my-2 font-bold text-headingColor'>{props.heading}</p>
                <p className='text-paraColor text-md my-4'>{props.des}</p>
                <button className='w-full text-center p-3 text-xl hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-md'>
                    Learn More
                </button>
            </div>
        </div>
    )
}

export default BusinessCard