import React from 'react'
import HistoryTable from '../components/reportHistory/historyTable/page'
import PlanCard from '../components/reportHistory/planCard/page'

const ReportHistory = () => {
    return (
        <div className='p-2'>
            <p className='text-3xl font-bold text-headingColor my-4'>Plan</p>
            <div className='w-full md:flex block items-center gap-6'>
                <PlanCard isprofessioanl={false} heading="Beginner" rate="$14" days="30 days remaining" btn="Cancel Subscription" />
                <PlanCard isprofessioanl={true} heading="Professional" rate="$52" days="365 days" btn="Upgrade" />
            </div>
            <p className='text-3xl font-bold text-headingColor my-4'>Report History</p>
            <HistoryTable />
        </div>
    )
}

export default ReportHistory