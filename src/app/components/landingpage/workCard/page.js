import Image from 'next/image'
import React from 'react'
import { FaTools } from 'react-icons/fa'
import { BsGraphUp } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
import { FaPerson } from 'react-icons/fa6';
import { IoPersonSharp } from 'react-icons/io5';



const WorkCard = () => {
    return (
        <div className='lg:flex bg-lightCard items-center block my-10'>
            <div className='w-full lg:w-[50%]'>
                <p className='text-4xl font-bold text-headingColor text-center my-6'>How It Works:</p>
                <Image className='w-full lg:h-[500px] h-full ' src="/images/lp5.jpg" width={1000} height={1000} />
            </div>
            <div className='w-full  lg:w-[50%]  bg-lightCard  p-10'>
                <div className='flex items-center gap-6 bg-blue-200 p-3 rounded-md my-4'>
                    <FaTools className='w-12 h-12 border border-white p-2' />
                    <p className='text-headingColor  text-md my-4'>Choose Your Simulator and Expert: Select the tool and guidance that suits your needs. </p>
                </div>
                <div className='flex items-center gap-6 bg-blue-200 p-3 rounded-md my-4'>
                    <BsGraphUp className='w-12 h-12 border border-white p-2' />
                    <p className='text-headingColor  text-md my-4'>Enter Your Data: Provide the necessary information for indepth analysis.</p>
                </div>
                <div className='flex items-center gap-6 bg-blue-200 p-3 rounded-md my-4'>
                    <TbTargetArrow className='w-12 h-12 border border-white p-2' />
                    <p className='text-headingColor  text-md my-4'>Instantly Receive Your Personalized Report: Obtain an eligibility score and recommendations to optimize your success chances. </p>
                </div>
                <div className='flex items-center gap-6 bg-blue-200 p-3 rounded-md my-4'>
                    <IoPersonSharp className='w-12 h-12 border border-white p-2' />
                    <p className='text-headingColor  text-md my-4'>Benefit from an Expert Consultation: Our specialists guide you to maximize your funding potential.</p>
                </div>
                <div className='flex justify-center'>
                    <button className='w-60 text-center p-4 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-full my-4'>
                        Start Your Simulation
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WorkCard