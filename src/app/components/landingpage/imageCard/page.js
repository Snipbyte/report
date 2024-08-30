import Image from 'next/image'
import React from 'react'

const ImageCard = (props) => {
    return (
        <div className=' lg:w-[30%] w-full mt-4 lg:mt-0'>
            <Image className='lg:w-full w-full h-60' src={props.img} width={1000} height={1000} />
            <div className='w-full h-40 border border-t-0 p-2'>
                <p className='text-headingColor text-2xl font-bold pt-2 mb-2'>{props.heading}</p>
                <p className='text-md  text-paraColor'>{props.des}</p>
            </div>
        </div>
    )
}

export default ImageCard