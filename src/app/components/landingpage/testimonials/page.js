import Image from 'next/image'
import React from 'react'

const Testimonials = () => {
    return (
        <div>
            <div className='flex flex-wrap justify-center w-full my-10'>
                <Image className='w-60 h-44 lg:mt-0 mt-2 rounded-md' src="/images/tm1.jpg" width={1000} height={1000} />
                <Image className='w-60 h-44 lg:mt-0 mt-2 rounded-md' src="/images/tm7.jpg" width={1000} height={1000} />
                <Image className='w-60 h-44 lg:mt-0 mt-2 rounded-md' src="/images/tm2.jpg" width={1000} height={1000} />
                <Image className='w-60 h-44 lg:mt-0 mt-2 rounded-md' src="/images/tm9.jpg" width={1000} height={1000} />
                <Image className='w-60 h-44 lg:mt-0 mt-2 rounded-md' src="/images/tm6.jpg" width={1000} height={1000} />
                <Image className='w-60 h-44 lg:mt-0 mt-2 rounded-md' src="/images/tm8.jpg" width={1000} height={1000} />
                <Image className='w-60 h-44 lg:mt-0 mt-2 rounded-md' src="/images/tm4.jpg" width={1000} height={1000} />
                <Image className='w-60 h-44 lg:mt-0 mt-2 rounded-md' src="/images/tm10.jpg" width={1000} height={1000} />
                <Image className='w-60 h-44 lg:mt-0 mt-2 rounded-md' src="/images/tm5.jpg" width={1000} height={1000} />
                <Image className='w-60 h-44 lg:mt-0 mt-2 rounded-md' src="/images/tm3.jpg" width={1000} height={1000} />
            </div>
            <div className='lg:flex block items-center p-16 gap-48'>
                <p className='text-headingColor text-3xl font-bold'>Testimonials:</p>
                <div>
                    <p className='text-lg text-headingColor mt-2'>IziKemp helped me secure the funding I needed to launch my project. The immediate report and expert consultation were invaluable!&quot;
                    </p>
                    <p className='text-headingColor text-md my-4'>— Alexia M., Successful Entrepreneur</p>
                </div>
            </div>
        </div>
    )
}

export default Testimonials