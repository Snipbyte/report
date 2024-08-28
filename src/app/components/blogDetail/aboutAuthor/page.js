import Image from 'next/image'
import React from 'react'

const AboutAuthor = () => {
    return (
        <div>
            <p className='text-3xl text-headingColor font-bold my-3'>Welcome to Our Blog!</p>
            <p className='text-paraColor textxm
             mt-5 mb-10 md:w-[900px] w-full'>At Furniture FurniFlex, we're committed to helping you create a home that not only looks beautiful but also feels comfortable and inviting. Our blog is your ultimate resource for design inspiration, practical tips, and the latest trends in home furnishings.</p>
            <Image className='w-full h-full rounded-3xl ' src="/images/aboutauthor.jpg" width={1000} height={1000} />
            <div className='md:flex  block items-center justify-between mt-3 mb-8'>
                <div>
                    <p className='text-headingColor text-2xl mt-4 font-bold'>How To Keep Your Furniture Clean</p>
                    <p className='text-paraColor'>by Robert Fox on Apr 20,24</p>
                </div>
                <div className='flex items-center gap-3 mt-2 md:mt-0'>
                    <Image className='w-10 h-10 rounded-full ' src="/images/girlimage.jpg" width={1000} height={1000} />
                    <div>
                        <p className='text-paraColor text-sm'>Written by</p>
                        <p className='text-headingColor text-lg'>Ariel Van Houten</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutAuthor