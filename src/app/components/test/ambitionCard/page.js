import Image from 'next/image'
import React from 'react'

const AmbitionCard = (props) => {
    return (
        <div className='w-full lg:w-[23%] bg-paraColor p-4 rounded-lg'>
            <Image className='w-20 h-24 mx-auto' src={props.img} width={1000} height={1000} />
            <p className='text-2xl font-bold text-headingColor mt-6 '>{props.heading}</p>
            <p className='text-headingColor my-3'>{props.des}</p>
            <button className='w-full text-center p-3 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-md my-3'>
                {props.btn}
            </button>
        </div>
    )
}

export default AmbitionCard