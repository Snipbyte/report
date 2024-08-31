import React from 'react'

const PreneursCard = () => {
    return (
        <div className='bg-paraColor p-4 rounded-md my-8'>
            <div className='flex flex-wrap items-center justify-center p-4'>
                <div className='border-l-2 border-black p-2 w-full lg:w-[25%]'>
                    <p className='text-headingColor font-bold text-2xl'>Simplicity</p>
                    <p className='text-headingColor text-md my-2'>All your legal and accounting procedures in one places</p>
                </div>
                <div className='border-l-2 border-black p-2 w-full lg:w-[25%]'>
                    <p className='text-headingColor font-bold text-2xl'>Speed</p>
                    <p className='text-headingColor text-md my-2'>A simple questionnaire to fill out online. File processing within 48 hours</p>
                </div>
                <div className='border-l-2 border-black p-2 w-full lg:w-[25%]'>
                    <p className='text-headingColor font-bold text-2xl'>Reliability</p>
                    <p className='text-headingColor text-md my-2'>More than 50 qualified lawyers at your side. Based in France.</p>
                </div>
                <div className='border-l-2 border-black p-2 w-full lg:w-[25%]'>
                    <p className='text-headingColor font-bold text-2xl'>Price</p>
                    <p className='text-headingColor text-md my-2'>Unbeatable value for money.
                        That’s also digital.</p>
                </div>
            </div>
        </div>
    )
}

export default PreneursCard