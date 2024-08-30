import Image from 'next/image'
import React from 'react'

const HorizontalCard = () => {
  return (
    <div className='md:flex block bg-white'>
      <div className='md:w-1/2 w-full'>
        <Image className='md:rounded-r-[40px] w-full h-96' src="/images/horizontalimage.jpg" width={1000} height={1000} />
      </div>
      <div className='md:w-1/2 w-full p-10'>
        <p className='my-2 text-hoverBtnColor font-bold text-md'>UI DESIGN</p>
        <p className='text-headingColor  font-bold text-3xl'>Card UI Examples And Best Practices For Product Owners</p>
        <p className='text-paraColor  my-4'>Now in 2022, more than 2.7 billion mobile app users in the world prefer Android apps. We follow the google design principles and the design thinking process to create seamless user experiences and aesthetic interfaces for mobile apps for the android platform.</p>
        <p className='text-paraColor mt-8'>We make android apps more relevant to users that users love to use and bring your business experience to the next level.</p>
      </div>
    </div>
  )
}

export default HorizontalCard