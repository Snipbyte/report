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
                    <Link href="/aboutus" className='hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300'>About Us</Link>
                    <Link href="/contact" className='hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300'>Contact Us</Link>
                </div>
                <div className='hidden md:flex gap-2 items-center'>
                    <FaFacebook className='w-5 h-5 hover:text-blue-700 hover:scale-125 transition ease-out hover:ease-in-out duration-300' />
                    <FaDribbble className='w-5 h-5 hover:text-pink-400 hover:scale-125 transition ease-out hover:ease-in-out duration-300' />
                    <FaTwitter className='w-5 h-5 hover:text-blue-500 hover:scale-125 transition ease-out hover:ease-in-out duration-300' />
                    <FaInstagram className='w-5 h-5 hover:text-pink-800 hover:scale-125 transition ease-out hover:ease-in-out duration-300' />
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
                    <Link href="/aboutus" className='hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300 text-white'>About Us</Link>
                    <Link href="/contact" className='hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300 text-white'>Contact Us</Link>
                    <div className="flex gap-2 items-center">
                        <FaFacebook className='w-5 h-5 text-white hover:text-blue-700 hover:scale-125 transition ease-out hover:ease-in-out duration-300' />
                        <FaDribbble className='w-5 h-5 text-white hover:text-pink-400 hover:scale-125 transition ease-out hover:ease-in-out duration-300' />
                        <FaTwitter className='w-5 h-5 text-white hover:text-blue-500 hover:scale-125 transition ease-out hover:ease-in-out duration-300' />
                        <FaInstagram className='w-5 h-5 text-white hover:text-pink-800 hover:scale-125 transition ease-out hover:ease-in-out duration-300' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
