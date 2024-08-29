import Image from 'next/image'
import React from 'react'

const StatsCard3 = () => {
  return (
    
         <div className='flex justify-center'>
           <div className="h-[400px] w-[300px] bg-white p-6 rounded-lg  ">
        <h2 className='text-2xl font-bold text-btnColor'>"Basement is Supringly hand for keeping my buisness stuff in one place</h2>
        <div className='flex items-center gap-2 mt-6'>
        <div>
        <Image
          className="w-10 h-10 rounded-full "
          src="/images/demo.png"
          width={1000}
          height={1000}
        />
        </div>
        <div>
            <p className='text-sm font-bold'>DAVID MILLER</p>
            <p className='text-xs text-paraColor'>Ecommerce</p>
        </div>
        </div>
       
       
      </div>
     
    </div>
    
  )
}

export default StatsCard3