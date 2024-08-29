import Image from 'next/image'
import React from 'react'

const StatsCard = () => {
  return (
    <div className='flex justify-center'>
        <div className="w-[300px] h-[400px] bg-white p-6 rounded-lg  ">
        <p className="text-sm">GROWTH</p>
        <p className="text-4xl font-bold">
          +21,35% <span className="text-sm text-paraColor">last month</span>
        </p>
        <p className="text-xs text-paraColor mt-4">
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum
        </p>
        <div className="w-[250px] mt-5 ">
        <Image
          className=" "
          src="/images/linechart.png"
          width={1000}
          height={1000}
        />
      </div>
      </div>
    
    </div>
          
  )
}

export default StatsCard