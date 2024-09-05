import Link from 'next/link'
import React from 'react'
import { FaDollarSign, FaPercent } from 'react-icons/fa'

const FormDetail = () => {
    return (
        <div className='bg-white border rounded-md shadow-md p-7 border-t-4 border-t-hoverBtnColor'>
            <div className='lg:flex block justify-center border border-desColor w-full'>
                <div className='w-full lg:w-1/2 p-3 bg-lightCard'>
                    <form className="">
                        <div>
                            <label for="loanamount" className="mb-3  text-headingColor">Loan amount</label>
                            <div className="relative">
                                <div className='flex  gap-3 items-center bg-white border border-desColor text-headingColor  rounded-md  w-full p-3 mt-2 mb-3'>
                                    <FaDollarSign className='text-paraColor' />
                                    <input type="text" id="loanamount" className=" outline-none " placeholder="5,000" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label for="loanyear" className="mb-3  text-headingColor">Loan term in years</label>
                            <input type="text" id="loanyear" className="bg-white  border border-desColor text-headingColor outline-none  rounded-md  w-full p-3 mt-2 mb-3" placeholder="5" />
                        </div>
                        <div>
                            <label for="loanmonth" className="mb-3 text-sm text-headingColor">Or</label><br />
                            <label for="loanmonth" className="mb-3  text-headingColor">Loan term in years</label>
                            <input type="text" id="loanmonth" className="bg-white outline-none border border-desColor text-headingColor  rounded-md  w-full p-3 mt-2 mb-3" placeholder="20" />
                        </div>


                        <label for="interest" className="mb-3  text-headingColor">Interest Rate Per Year</label>
                        <div>
                            <div className='lg:flex block items-center  gap-5'>
                                <div className='flex justify-between items-center bg-white border border-desColor text-headingColor  rounded-md  w-full p-3'>
                                    <input type="text" id="interest" className=" outline-none" placeholder="6" />
                                    <FaPercent className='text-paraColor' />
                                </div>
                                <button className="w-full text-lg text-white bg-btnColor hover:bg-hoverBtnColor duration-700  rounded-md p-3 lg:mt-0 mt-4">
                                    Calculate
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
                <div className='w-full lg:w-1/2 p-3 mt-4 lg:mt-0'>
                    <p className='text-center text-headingColor text-sm'>Monthly payments</p>
                    <p className='text-center text-headingColor font-bold text-4xl mb-5'>$ 99.99</p>
                    <div className='text-headingColor flex items-center justify-between border-b pb-3 border-desColor'>
                        <p>Total principal paid</p>
                        <p>$5,000</p>
                    </div>
                    <div className='text-headingColor flex items-center justify-between mt-3 border-desColor'>
                        <p>Total interest paid</p>
                        <p>$799.84</p>
                    </div>
                    <div className='flex justify-center'>
                        <Link className='text-btnColor hover:text-hoverBtnColor mt-48' href=''>Show amortization schedule</Link>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default FormDetail