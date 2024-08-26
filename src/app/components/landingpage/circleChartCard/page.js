import React from 'react'
import CircleChart from '../../common/Charts/circleChart/page'
import { IoPersonOutline } from "react-icons/io5";
import { BiTargetLock } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";




const CircleChartCard = () => {
    return (
        <div className='lg:flex block gap-5 items-center justify-center'>
            <div className='lg:w-1/2 w-full flex justify-end' >
                <CircleChart />
            </div>
            <div className='lg:w-1/2 w-full p-7'>
                <p className='text-sm text-paraColor'>Without access to corporate emails or computers, these employees heavily on direct manager to relay information</p>
                <div className='flex items-center gap-5 my-4'>
                    <IoPersonOutline className='w-10 h-10 bg-lightCard p-3 text-desColor rounded-full items-center justify-center flex ' />
                    <div>
                        <p className='font-bold'>Employees</p>
                        <p className='text-paraColor text-sm my-1'>Disengaged - Disconected from peers and organization goals</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 my-4'>
                    <RiTeamLine className='w-10 h-10 bg-lightCard p-3 text-desColor rounded-full items-center justify-center flex ' />
                    <div>
                        <p className='font-bold'>Organization</p>
                        <p className='text-paraColor text-sm my-1'>No visibility into operations</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 my-4'>
                    <BiTargetLock className='w-10 h-10 bg-lightCard p-3 text-desColor rounded-full items-center justify-center flex ' />
                    <div>
                        <p className='font-bold'>Overall Impact</p>
                        <p className='text-paraColor text-sm my-1'>Low productivity, low compliance, high employe turnover, poor customer experience</p>
                    </div>
                </div>
                <p className='text-sm font-bold text-paraColor my-6'>Slate bridges this gap by providing a mobile platformto train, engage, manage and communication with deskless employess.</p>
            </div>
        </div>
    )
}

export default CircleChartCard