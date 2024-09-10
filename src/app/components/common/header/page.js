"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaDribbble, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

const Header = () => {
    const [shownav, setshownav] = useState(false);
    const menuRef = useRef(null); // Reference for the menu
    const headerRef = useRef(null); // Reference for the header

    // Function to toggle the shownav state
    const toggleNav = () => {
        setshownav(!shownav); // Toggle the value of shownav
    };

    // Function to close navbar when clicking outside of it
    const handleClickOutside = (event) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            !headerRef.current.contains(event.target)
        ) {
            setshownav(false);
        }
    };

    useEffect(() => {
        // Add event listener to handle click outside
        document.addEventListener("click", handleClickOutside);

        // Toggle body overflow when menu is open
        if (shownav) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.body.style.overflow = 'auto'; // Ensure overflow is reset on unmount
        };
    }, [shownav]);

    return (
        <div ref={headerRef}>
            <div className='text-white flex items-center justify-between p-4 bg-desColor'>
                <Link href="/">
                    <Image className='w-24 h-16' src="/images/logo.png" width={1000} height={1000} alt="Logo" />
                </Link>
                <div className='hidden md:flex gap-4 items-center'>
                    <Link href="/" className='hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300'>Home</Link>
                    <Link href="/about" className='hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300'>About Us</Link>
                    <Link href="/contact" className='hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300'>Contact Us</Link>
                    <Link href="/blogs" className='hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300'>Blogs</Link>
                    <Link href="/pricingplan" className='hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300'>Pricing</Link>
                </div>
                <div className='hidden md:flex gap-2 items-center'>
                    <button className="text-center border-2 w-20 p-2 rounded-lg text-black bg-white duration-700 hover:text-hoverBtnColor">Login</button>
                    <button className="text-center text-white border-2 w-20 p-2 rounded-lg border-white hover:text-black hover:bg-white duration-700">Signup</button>
                </div>
                <button className="md:hidden" onClick={toggleNav}>
                    <CiMenuFries size={30} />
                </button>
            </div>

            {/* For small screens */}
            {shownav && <div className="fixed inset-0 bg-black bg-opacity-80 z-40" onClick={toggleNav}></div>}
            <div
                ref={menuRef}
                className={`fixed inset-0 z-50 w-64 bg-gradient-to-tl from-desColor via-desColor to-[#0D1F2B] px-6 py-4 flex flex-col items-center transform transition-transform duration-300 ${shownav ? "translate-x-0" : "translate-x-[-100%]"}`}
            >
                <button onClick={toggleNav} className="absolute top-4 right-6 text-xl text-white">
                    X
                </button>
                <div className="flex flex-col gap-5 mt-20">
                    <Link href="/" className='hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300 text-white'>Home</Link>
                    <Link href="/about" className='hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300 text-white'>About Us</Link>
                    <Link href="/contact" className='hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300 text-white'>Contact Us</Link>
                    <Link href="/pricingplan" className='hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300 text-white'>Pricing</Link>
                    <div className="flex gap-2 items-center">
                        <Link href="login" className="text-center border-2 w-20 p-2 rounded-lg text-black bg-white duration-700 hover:text-hoverBtnColor">Login</Link>
                        <Link href="signup" className="text-center text-white border-2 w-20 p-2 rounded-lg border-white hover:text-black hover:bg-white duration-700">Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
