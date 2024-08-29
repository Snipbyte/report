import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight,  FaMailBulk, } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className="bg-gradient-to-tl from-desColor via-desColor to-[#0D1F2B] text-white p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between mt-5 mb-12">
            <div className="mb-4 lg:mb-0">
                <Link href="/">
                    {/* <Image className='w-40 h-20 my-2' src="/images/ksllogo.webp" width={1000} height={1000} /> */}
                    Logo here
                </Link>
            </div>
            <div className="w-full md:w-[55%] lg:w-[45%] my-2">
                <p className="text-lg lg:text-2xl font-bold">
                    For any inquiries, contact us at [email/contact]. Follow us on [social media]. Join our community of successful entrepreneurs!
                </p>
            </div>
        </div>
        <div className="flex flex-wrap gap-8 lg:gap-[100px]">
            <div className="w-full lg:w-auto mb-6">
                <p className="font-bold text-xl my-2">Newsletter Signup</p>
                <div className="flex items-center justify-between w-full lg:w-96">
                    <FaMailBulk />
                    <input
                        className="outline-none border-b-[1px] bg-transparent py-3 my-2 w-full lg:w-80 border-white mb-4"
                        type="text"
                        placeholder="Enter Your Email Address"
                    />
                    <FaArrowRight />
                </div>
                <div className="flex gap-1 items-center my-2 text-gray-300">
                    <input type="checkbox" />
                    <p>I agree to the</p>
                    <button className="underline text-sm underline-offset-4 hover:text-blue-700">Privacy Policy</button>
                </div>
            </div>
            <div className="w-full lg:w-auto mb-6">
                <p className="font-bold text-xl">Socials</p>
                <p className="text-gray-300 my-4 lg:my-6">Facebook</p>
                <p className="text-gray-300 my-4 lg:my-6">Twitter</p>
                <p className="text-gray-300 my-4 lg:my-6">Dribble</p>
                <p className="text-gray-300 my-4 lg:my-6">Instagram</p>
            </div>
            <div className="w-full lg:w-auto mb-6">
                <p className="font-bold text-xl">Menu</p>
                <Link className="text-gray-300 my-4 lg:my-6 block" href="/aboutus">About Us</Link>
                <Link className="text-gray-300 my-4 lg:my-6 block" href="/contact">Contact</Link>
                <Link className="text-gray-300 my-4 lg:my-6 block" href="/registration-form">Register</Link>
            </div>
            <div className="w-full lg:w-auto mb-6">
                <p className="font-bold text-xl">Say Hello</p>
                <p className="text-gray-300 my-4 lg:my-6">info@youremail.com</p>
            </div>
        </div>
        <hr className="mt-12 lg:mt-16 border-gray-600" />
    </div>
    
    )
}

export default Footer