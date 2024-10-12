import Link from 'next/link'
import React from 'react'

const MainServiceCard = (props) => {
    return (
        <div className='w-full lg:w-[45%] bg-paraColor p-4 rounded-md'>
            <p className='text-3xl font-bold text-headingColor my-2'>{props.heading}</p>
            <div className='flex flex-wrap my-6 items-center gap-3'>
                <button className='text-lightCard text-lg  hover:text-btnColor duration-700'>{props.service1}</button>
                <button className='text-lightCard text-lg  hover:text-btnColor duration-700'>{props.service2}</button>
                <button className='text-lightCard text-lg  hover:text-btnColor duration-700'>{props.service3}</button>
             
            </div>
            <div className='flex my-2 justify-end'>
                <div>
                </div>
                <Link href="/landing-page" className='w-56 text-center p-3 text-lg hover:duration-700 bg-btnColor text-white hover:bg-hoverBtnColor rounded-md'>
                    {props.btn}
                </Link>
            </div>
        </div>
    )
}

export default MainServiceCard