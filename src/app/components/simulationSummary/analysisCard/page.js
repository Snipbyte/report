import React from 'react'
import { FaEuroSign } from 'react-icons/fa'

const AnalysisCard = () => {
    return (
        <div>
            <p className='text-3xl font-bold text-btnColor mb-4 '>Analysis of your investments</p>
            <div className='flex items-center border-t py-2 bg-lightCard p-1 text-md text-headingColor justify-between'>
                <p>Total payments</p>
                <div className='flex items-center gap-40'>
                    <p>:</p>
                    <div className='flex items-center'>
                        <p>85,000 </p>
                        <FaEuroSign/>
                    </div>
                </div>
            </div>
            <div className='flex items-center border-t py-2 p-1 text-md text-headingColor justify-between'>
                <p>Including initial capital</p>
                <div className='flex items-center gap-40'>
                    <p>:</p>
                    <div className='flex items-center'>
                        <p>85,000 </p>
                        <FaEuroSign/>
                    </div>
                </div>
            </div>
            <div className='flex items-center border-t py-2 bg-lightCard p-1 text-md text-headingColor justify-between'>
                <p>Including monthly payments</p>
                <div className='flex items-center gap-40'>
                    <p>:</p>
                    <div className='flex items-center'>
                        <p>25,000 </p>
                        <FaEuroSign/>
                    </div>
                </div>
            </div>
            <div className='flex items-center border-t py-2 p-1 text-md text-headingColor justify-between'>
                <p>Financial products</p>
                <div className='flex items-center gap-40'>
                    <p>:</p>
                    <div className='flex items-center'>
                        <p>60,000 </p>
                        <FaEuroSign/>
                    </div>
                </div>
            </div>
            <div className='flex items-center font-bold border-t py-2 bg-lightCard p-1 text-md text-headingColor justify-between'>
                <p>Duration</p>
                <div className='flex items-center gap-36'>
                    <p>:</p>
                    <div className='flex items-center '>
                        <p>120 months</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center border-t border-blue-500 bg-lightCard font-bold py-2 p-1 text-sm justify-end'>
                <p className='text-lg text-red-500'>Capital due in 10 years: €104,924</p>
            </div>
        </div>
    )
}

export default AnalysisCard