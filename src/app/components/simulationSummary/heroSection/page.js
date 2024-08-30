import Image from 'next/image'
import React from 'react'
import { FaEuroSign } from "react-icons/fa";


const HeroSection = () => {
    return (
        <div className='bg-desColor w-full p-4'>
            <div className='lg:flex block my-6 items-center justify-around'>
                <Image className='w-32 h-24' src="/images/handlogo.png" width={1000} height={1000} />
                <div>
                    <h1 className='lg:text-5xl text-xl font-bold text-btnColor '>Simulate your financial investments</h1>
                    <p className='text-white text-lg w-[800px] my-3'>Free and anonymous, this simulator allows you to simulate the evolution of a financial investment and calculate the capital available at the end of your investment.</p>
                </div>
                <Image className='w-14 h-14' src="/images/icon.png" width={1000} height={1000} />
            </div>
            <div className='lg:flex block justify-center gap-10 p-4'>
                <div className='lg:w-1/2 w-full'>
                    <div className='bg-btnColor flex items-center justify-between px-3'>
                        <div></div>
                        <p className='text-white text-center text-lg flex justify-center'>1 - YOUR INVESTMENT</p>
                        <Image className='w-10 h-10 flex justify-end' src="/images/icon.png" width={1000} height={1000} />
                    </div>
                    <div className='bg-lightCard p-4'>
                        <div className='flex items-center justify-between my-3'>
                            <p>Your initial contribution</p>
                            <div className='flex items-center'>
                                <input className='text-headingColor outline-none w-full p-2 border' type='text' placeholder='2500' />
                                <FaEuroSign className='w-10 h-10 bg-transparent p-3 border' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between my-3'>
                            <p>Your monthly savings</p>
                            <div className='flex items-center'>
                                <input className='text-headingColor outline-none w-full p-2 border' type='text' placeholder='500' />
                                <FaEuroSign className='w-10 h-10 bg-transparent p-3 border' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between my-3'>
                            <p>Duration of investment</p>
                            <select className="text-headingColor outline-none p-2 border w-[150px] lg:w-[255px]">
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="02">03</option>
                                <option value="02">04</option>
                                <option value="02">05</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='lg:w-1/2 w-full'>
                    <div className='bg-btnColor flex items-center justify-between px-3'>
                        <div></div>
                        <p className='text-white text-center text-lg p-2 flex justify-center'>2 - PLACEMENT CHARACTERISTIC</p>
                        <Image className='w-10 h-10 flex justify-end' src="/images/icon.png" width={1000} height={1000} />
                    </div>
                    <div className='bg-lightCard p-4'>
                        <div className='flex items-center justify-between my-3'>
                            <p>Interance Fees</p>
                            <select className="text-headingColor outline-none p-2 border w-[150px] lg:w-[255px]">
                                <option value="01">0.00%</option>
                                <option value="02">0.02%</option>
                                <option value="02">0.03%</option>
                                <option value="02">0.04%</option>
                                <option value="02">0.05%</option>
                            </select>
                        </div>
                        <div className='flex items-center justify-between my-3'>
                            <p>Interest Rates</p>
                            <select className="text-headingColor outline-none p-2 border w-[150px] lg:w-[255px]">
                                <option value="01">0.00%</option>
                                <option value="02">0.02%</option>
                                <option value="02">0.03%</option>
                                <option value="02">0.04%</option>
                                <option value="02">0.05%</option>
                            </select>
                        </div>
                        <div className='flex items-center justify-between mb-5 my-3'>
                            <p>Start of the operation</p>
                            <div className='flex items-center'>
                                <select className="text-headingColor outline-none p-2 borderw-[150px] lg:w-[205px]">
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="02">03</option>
                                    <option value="02">04</option>
                                    <option value="02">05</option>
                                </select>
                                <select className="text-headingColor outline-none p-2 border w-[50px]">
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="02">03</option>
                                    <option value="02">04</option>
                                    <option value="02">05</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-end'>
                <button className='w-48 p-2 rounded-md duration-700 text-lg bg-btnColor text-white hover:bg-hoverBtnColor'>Start the Simulation</button>
            </div>
        </div>

    )
}

export default HeroSection