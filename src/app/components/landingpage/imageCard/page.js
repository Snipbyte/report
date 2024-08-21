import Image from 'next/image'
import React from 'react'

const ImageCard = (props) => {
    return (
        <div>
            <Image className='w-80 h-80' src={props.img} width={1000} height={1000} />
            <p className='text-headingColor font-bold my-6'>{props.heading}</p>
            <p className='text-sm text-paraColor'>{props.des}</p>
        </div>
    )
}

export default ImageCard