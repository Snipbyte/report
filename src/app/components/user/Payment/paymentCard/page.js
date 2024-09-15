import React from 'react'
import MyPlanCard from './myPlanCard/page'
import PaymentMethodCard from './paymentMethodCard/page'
import PaymentTable from './paymentTable/page'
import { MdOutlineFileDownload } from 'react-icons/md'

const PaymentCard = () => {
  return (
    <div>
      <div className='flex flex-wrap border-y py-6 '>
        <MyPlanCard />
        {/* <PaymentMethodCard /> */}
      </div>
   
    </div>
  )
}

export default PaymentCard