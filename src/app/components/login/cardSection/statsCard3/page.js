"use client";

import Image from 'next/image'
import React from 'react'
import { useTranslation } from "react-i18next";

const StatsCard3 = () => {
  const { t } = useTranslation();

  return (
    
         <div className='flex justify-center'>
           <div className="h-[400px] w-[300px] bg-white p-6 rounded-lg  ">
        <h2 className='text-2xl font-bold text-btnColor'>"  {t("extraTxt")}</h2>
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