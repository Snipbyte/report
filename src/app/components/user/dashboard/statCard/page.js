import React from 'react'
import { MdArrowOutward } from "react-icons/md";
import { GoArrowDownLeft } from "react-icons/go";



const StatCard = (props) => {
    return (
        <div className='border py-4 p-2 md:w-3/12 w-full'>
            <p className='text-paraColor text-xs'>{props.heading}</p>
            {props.ispercent ?  <div className='flex items-center gap-2 '>
                <p className='text-headingColor text-4xl font-bold my-3 '>{props.data}</p>
                <div className='flex items-center gap-1 bg-green-100 font-bold w-16 text-xs text-green-600 p-1 rounded-full'>
                    <p>{props.percent}</p>
                    <MdArrowOutward />
                </div>
            </div> :  <div className='flex items-center gap-2 '>
                <p className='text-headingColor text-4xl font-bold my-3 '>{props.data}</p>
                <div className='flex items-center gap-1 bg-red-100 font-bold w-16 text-xs text-red-600 p-1 rounded-full'>
                    <p>{props.percent}</p>
                    <GoArrowDownLeft/>
                </div>
            </div>}
            <p className='text-paraColor text-xs'>{props.des}</p>
        </div>
    )
}

export default StatCard