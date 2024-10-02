import React from 'react'
import { useTranslation } from "react-i18next";

const PreneursCard = () => {
    const { t } = useTranslation();

    return (
        <div className='bg-paraColor p-4 rounded-md my-8'>
            <div className='flex flex-wrap items-center justify-center p-4'>
                <div className='border-l-2 border-black p-2 w-full lg:w-[25%]'>
                    <p className='text-headingColor text-md my-2'>
                    {t("personalizedReportsfinal")}
                        </p>
                </div>
                <div className='border-l-2 border-black p-2 w-full lg:w-[25%]'>
                <p className='text-headingColor text-md my-2'>
                    {t("advancedScoringfinal")}
                        </p>
                </div>
                <div className='border-l-2 border-black p-2 w-full lg:w-[25%]'>
                <p className='text-headingColor text-md my-2'>
                    {t("freeConsultationfinal")}
                        </p>
                </div>
             
            </div>
        </div>
    )
}

export default PreneursCard