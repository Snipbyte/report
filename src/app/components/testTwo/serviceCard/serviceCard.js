import React from 'react'


const ServiceCard = (props) => {
    return (
        <div className='w-full lg:w-[13%] text-center'>
            <div className={`w-full lg:p-10 p-7 text-7xl text-white rounded-tl-[40px] rounded-br-[40px] flex items-center justify-center ${props.bgColor} `}>
               {props.icon}
            </div>
            <p className='text-headingColor font-bold my-8 text-md md:text-xl '>{props.heading}</p>
        </div>
    )
}

export default ServiceCard