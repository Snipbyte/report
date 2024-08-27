import Image from 'next/image'
import React from 'react'

const VerticalCard = (props) => {
  return (
    <div className='w-96'>
      <Image className=' rounded-t-3xl h-60' src={props.img} width={1000} height={1000} />
      <div className='border p-2'>
      <p className='my-2 text-hoverBtnColor font-bold text-sm'>{props.heading}</p>
      <p className='text-headingColor  font-bold text-xl'>{props.des}</p>
      </div>
    </div>
  )
}

export default VerticalCard