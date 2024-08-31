import React from 'react'

const MainServiceCard = (props) => {
    return (
        <div className='w-full lg:w-[45%] bg-paraColor p-4 rounded-md'>
            <p className='text-3xl font-bold text-headingColor my-2'>{props.heading}</p>
            <div className='flex flex-wrap my-6 items-center gap-3'>
                <button className='text-lightCard text-lg underline hover:text-btnColor duration-700'>Creation of a SASU</button>
                <button className='text-lightCard text-lg underline hover:text-btnColor duration-700'>Creation of an SAS</button>
                <button className='text-lightCard text-lg underline hover:text-btnColor duration-700'>Creation of an SARL</button>
                <button className='text-lightCard text-lg underline hover:text-btnColor duration-700'>Creation of an EURL</button>
                <button className='text-lightCard text-lg underline hover:text-btnColor duration-700'>Creation of an SCI</button>
                <button className='text-lightCard text-lg underline hover:text-btnColor duration-700'>Creation of a self-employee entrepreneur</button>
                <button className='text-lightCard text-lg underline hover:text-btnColor duration-700'>Creation of an association</button>
                <button className='text-lightCard text-lg underline hover:text-btnColor duration-700'>Creation of an soloe proprietorship</button>
            </div>
            <div className='flex my-2 justify-end'>
                <div>
                </div>
                <button className='w-56 text-center p-3 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-md'>
                    {props.btn}
                </button>
            </div>
        </div>
    )
}

export default MainServiceCard