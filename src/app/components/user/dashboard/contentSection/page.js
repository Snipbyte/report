import React from 'react'
import { CiExport } from "react-icons/ci";
import StatCard from '../statCard/page';


const ContentSection = () => {
    return (
        <div>
            <div className='flex  items-center justify-between my-5'>
                <p className='text-headingColor text-2xl font-bold'>Dashboard</p>
                <div className='text-sm flex items-center gap-3 justify-end'>
                    <div>
                        <input className='outline-none border text-paraColor p-1' type='date' />
                        <select className="text-paraColor border outline-none p-1.5">
                            <option value="D">Daily</option>
                            <option value="W">Weakly</option>
                            <option value="M">Monthly</option>
                            <option value="Y">Yearly</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-1 p-2 w-28 text-center text-white rounded-md bg-btnColor hover:bg-hoverBtnColor'>
                        <CiExport className='w-4 h-4' />
                        <button className='text-white'>Export CSV</button>
                    </div>
                </div>
            </div>
            <div className='md:flex block items-center justify-center my-4'>
                <StatCard ispercent={true} heading="Product Revenue" data="€4,250" percent="+ 8%" des="+€1,245 Revenue" />
                <StatCard ispercent={false} heading="Total Deals" data="1625" percent="- 5%" des="+842 Deals" />
                <StatCard ispercent={true} heading="Created Tickets" data="3452" percent="+ 16%" des="1023 Tickets" />
                <StatCard ispercent={true} heading="Average Reply" data="8:02" percent="+ 4%" des="+0:40 Faster" />
            </div>
        </div>
    )
}

export default ContentSection