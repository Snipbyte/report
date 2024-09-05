import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

const BusinessContent = (props) => {
    return (
        <div className='w-full lg:w-[70%] p-1'>
            <div className='flex items-center justify-between cursor-pointer text-headingColor hover:text-hoverBtnColor w-full bg-white shadow-md border hover:border-l-4 duration-500 hover:border-l-hoverBtnColor p-6 rounded-md'>
                <p>{props.info}</p>
                <IoIosArrowForward className='w-6 h-6' />
            </div>
        </div>
    )
}

export default BusinessContent