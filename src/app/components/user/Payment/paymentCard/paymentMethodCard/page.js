import React from 'react'
import { FaPaypal } from 'react-icons/fa'

const PaymentMethodCard = () => {
    return (
        <div className='w-full md:w-1/2'>
            <p className='text-xl mt-4 text-headingColor'>Payment Method</p>
            <p className='text-sm text-paraColor my-1'>Change how you pay your plan.</p>
            <div className='border w-96 p-4 my-3'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <FaPaypal className='text-blue-600' />
                        <div>
                            <p className='text-sm text-headingColor'>customer@gmail.com</p>
                            <p className='text-sm text-paraColor'>expiry 8/2023</p>
                        </div>
                    </div>
                    <button className='bg-rose-100 rounded-md w-20 text-sm p-1 text-btnColor'>Change</button>
                </div>
            </div>
            <p className='text-sm text-paraColor my-2 w-96'>Note: Please be carefull on choosing your payment method, because we will automatically cut your balance.</p>
        </div>
    )
}

export default PaymentMethodCard