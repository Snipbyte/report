import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'

const FormSection = () => {
  return (
    <div className="md:w-1/2 w-full bg-lightCard  md:p-16 p-10">
      <Link href="/">
        <Image className='w-20 h-14 mb-4' src="/images/logo.png" width={1000} height={1000} alt="Logo" />
      </Link>
      <h2 className="text-3xl font-bold">
        Keep your online <br />
        buisness organized
      </h2>
      <p className="text-sm text-paraColor mt-1">
        Sign up to start your 30 days free trial
      </p>
      <div className="flex items-center gap-2 border-2 w-fit px-16 py-2 rounded-lg mt-6">
        <FaGoogle className="text-btnColor" />
        <p className="text-sm">Sign in with Google</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="border mt-8 w-32"></div>
        <p className="text-sm mt-7 text-paraColor">or</p>
        <div className="border mt-8 w-32"></div>
      </div>
      <div className="mt-3">
        <label className="text-sm">Name</label>
        <br />
        <input
          type="text"
          placeholder="Enter your name"
          className="text-sm outline-none w-72 border-2 rounded p-1.5 mt-1"
        />
      </div>
      <div className="mt-3">
        <label className="text-sm">Email</label>
        <br />
        <input
          type="email"
          placeholder="Enter your Email"
          className="text-sm outline-none w-72 border-2 rounded p-1.5 mt-1"
        />
      </div>
      <div className="mt-3">
        <label className="text-sm">Password</label>
        <br />
        <input
          type="password"
          placeholder="Enter your Password"
          className="text-sm outline-none w-72 border-2 rounded p-1.5 mt-1"
        />
      </div>
      <div className="mt-5">
        <button className=" text-black border-2 w-72 my-8 p-2 rounded-lg border-black hover:text-white hover:bg-black duration-700">Sign up</button>
      </div>
      <Link href="login" className="text-sm my-2 text-paraColor">Already have an account? <span className="text-btnColor underline hover:text-hoverBtnColor">Login</span></Link>
    </div>

  )
}

export default FormSection