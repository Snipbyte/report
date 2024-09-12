import React from 'react'

const PlanCard = (props) => {
    return (
        <div className={`w-full lg:w-[50%] p-6 md:mt-0 mt-2 ${props.isprofessioanl ? "bg-hoverBtnColor" : "border-2 border-hoverBtnColor"}`}>
            <div className='flex items-center justify-between'>
                <p className={`text-xl font-bold ${props.isprofessioanl ? "text-white" : "text-headingColor"} `}>{props.heading}</p>
                <p className={`text-xl ${props.isprofessioanl ? "text-white" : "text-headingColor"}`}>{props.rate}<span className='text-paraColor'>/month</span></p>
            </div>
            <p className='text-paraColor text-sm'>{props.days}</p>
            <div className='flex items-center gap-4 mt-8'>
                <button className='bg-white border border-btnColor text-btnColor p-2 rounded-md text-sm hover:text-hoverBtnColor hover:border-hoverBtnColor'>{props.btn}</button>
                {props.isprofessioanl ? <p className='text-lightCard'>Learn more about this plan</p> : ""}
            </div>
        </div>
    )
}

export default PlanCard