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
        <PaymentMethodCard />
      </div>
      <div>
        <div className='flex flex-wrap mt-4 gap-3 items-center justify-between p-3'>
          <div>
            <p className='md:text-xl text-headingColor text-lg font-bold'>Payment History (24)</p>
            <p className='text-paraColor text-sm'>See history of your payment plan invoice</p>
          </div>
          <div className='flex items-center gap-1 text-white justify-center bg-btnColor hover:bg-hoverBtnColor w-36 p-2 rounded-md'>
            <MdOutlineFileDownload/>
            <button>Download All</button>
          </div>
        </div>
        <PaymentTable />
      </div>
    </div>
  )
}

export default PaymentCard