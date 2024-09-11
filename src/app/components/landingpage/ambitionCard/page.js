import Image from 'next/image'
import React from 'react'

const AmbitionCard = () => {
    return (
        <div className='lg:flex block my-10'>
            <div className='w-full lg:w-[50%]'>
                <Image className='w-full lg:h-[400px] h-full' src="/images/lp7.jpg" width={1000} height={1000} />
            </div>
            <div className='w-full   lg:w-[50%]  bg-lightCard shadow-2xl p-10'>
                <p className='text-headingColor  text-3xl my-4'>Try IziKemp, generate
                    your report instantly, and discuss with an expert today!</p>
                <div className='flex justify-center'>
                    <button className='w-60 text-center p-4 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full my-4'>
                        Start Your Simulation
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AmbitionCard