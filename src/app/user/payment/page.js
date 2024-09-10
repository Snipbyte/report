import PaymentCard from '@/app/components/user/Payment/paymentCard/page'
import React from 'react'

const Payment = () => {
  return (
    <div className='p-3'>
      <div className='my-4'>
        <p className='md:text-3xl text-xl font-bold'>Payment</p>
        <p className='text-paraColor text-sm my-1'>Update Your Payment information or change you plans according to your needs.</p>
      </div>
      <PaymentCard />
    </div>
  )
}

export default Payment