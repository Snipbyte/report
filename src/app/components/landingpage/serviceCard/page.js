import Link from 'next/link'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'

const ServiceCard = (props) => {
    return (
        <div className="bg-center bg-cover  lg:w-[20%] w-full h-full hover:rounded-lg"
            style={{ backgroundImage: `url(/images/${props.image})` }}>
            <div className='p-3  w-full h-full bg-black hover:bg-opacity-0 bg-opacity-60 text-opacity-100'>
                <p className='text-white text-lg  text-center font-bold'>{props.heading}</p>
                <div className='flex h-full gap-2 justify-end'>
                    <Link href="our-services" className='text-white flex mt-44 items-center hover:bg-hoverBtnColor hover:duration-700 w-32 rounded-md p-2 gap-2 text-md font-bold'>Read More<FaArrowRightLong /></Link>

                </div>
            </div>
        </div>
    )
}

export default ServiceCard