import Image from 'next/image'
import React from 'react'

const StatsCard4 = () => {
  return (
    <div>
        <div className='flex justify-center'>
        <div className="h-[400px] w-[300px] bg-white p-6 rounded-lg  ">
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
          src="/images/pie graph.png"
          width={1000}
          height={1000}
        />
      </div>
      </div>
        </div>
       
    
    </div>
  )
}

export default StatsCard4