import React from 'react'
import BusinessContent from '../businessContent/page'

const BusinessCard = () => {
    return (
        <div className='w-full p-3 mb-4'>
            <div className='lg:flex block'>
                <BusinessContent info="Calculate Your Payment on any loan" />
                <BusinessContent info="Current Ratio Calculator" />
            </div>
            <div className='lg:flex block'>
                <BusinessContent info="Quick Ratio Calculator" />
                <BusinessContent info="Dect-to-assete Ratio Calculator" />
            </div>
            <div className='lg:flex block'>
                <BusinessContent info="Return on assets Calculator" />
                <BusinessContent info="Gross profit margin Calculator" />
            </div>
        </div>
    )
}

export default BusinessCard