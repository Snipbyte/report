import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <div className='bg-desColor p-2'>
            <p className='text-white my-6 lg:text-6xl text-2xl text-center  font-bold'>Undertake <span className='text-btnColor'> More simply.</span></p>
            <p className='text-white text-xl text-center w-full lg:w-[500px] mx-auto my-6'>Create and manage your business with the market leader: fast, reliable and economical.</p>
            <div className='flex flex-wrap items-center justify-center gap-5 my-8'>
                <button className='w-36 lg:w-56 text-center p-3 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-md'>
                    Create My Bussiness
                </button>
                <button className='w-36 lg:w-56 text-center p-3 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-md'>
                    Edit My Statuses
                </button>
                <button className='w-36 lg:w-56 text-center p-3 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-md'>
                    Close My Business
                </button>
            </div>
            <div className='flex flex-wrap items-center justify-center gap-5 my-8'>
                <Image className='w-full md:w-56 h-72 rounded-md' src="/images/worker1.jpg" width={1000} height={1000}/>
                <Image className='w-full md:w-56 h-60 rounded-md' src="/images/image3.jpg" width={1000} height={1000}/>
                <Image className='w-full md:w-56 h-72 rounded-md' src="/images/image1.jpg" width={1000} height={1000}/>
                <Image className='w-full md:w-56 h-60 rounded-md' src="/images/image2.jpg" width={1000} height={1000}/>
                <Image className='w-full md:w-56 h-72 rounded-md' src="/images/worker2.jpg" width={1000} height={1000}/>
            </div>
        </div>
    )
}

export default HeroSection