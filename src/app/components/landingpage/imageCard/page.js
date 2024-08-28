import Image from 'next/image'
import React from 'react'

const ImageCard = (props) => {
    return (
        <div>
            <Image className='w-full h-80' src={props.img} width={1000} height={1000} />
            <div className='w-full h-28 border border-t-0 p-2'>
                <p className='text-headingColor font-bold pt-2 mb-2'>{props.heading}</p>
                <p className='text-sm  text-paraColor'>{props.des}</p>
            </div>
        </div>
    )
}

export default ImageCard