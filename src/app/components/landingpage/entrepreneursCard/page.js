import Image from 'next/image'
import React from 'react'

const EntrepreneursCard = () => {
    return (
        <div className='lg:flex block items-center justify-center p-10 shadow-2xl'>
            <div className='lg:w-1/2 w-full '>
                <p className='text-headingColor text-4xl  p-10'>
                    More than <span className='text-btnColor font-bold'> 530,000 entrepreneurs</span> supported by our teams for last 07 years
                </p>
            </div>

            <div className='lg:w-1/2 w-full h-[405px]'>
                <div class="grid grid-rows-3 grid-flow-col gap-2 ">
                    <div class="row-span-3"> <Image className=' rounded-md w-full h-[405px]' src="/images/worker3.jpg" width={1000} height={1000} /></div>
                    <div class="col-span-2"> <Image className=' rounded-md w-full h-[200px]' src="/images/worker1.jpg" width={1000} height={1000} /></div>
                    <div class="row-span-2 col-span-2"><Image className=' rounded-md w-full h-[200px]' src="/images/worker2.jpg" width={1000} height={1000} /></div>
                </div>

            </div>
        </div>
    )
}

export default EntrepreneursCard 