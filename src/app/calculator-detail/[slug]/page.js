import FormDetail from '@/app/components/calculatorDetail/formDetail/page'
import HeroSection from '@/app/components/calculatorDetail/hearoSection/page'
import Footer from '@/app/components/common/footer/page'
import Header from '@/app/components/common/header/page'
import React from 'react'

const CalculatorDetail = () => {
    return (
        <div>
            <Header />
            <div className='p-4'>
                <HeroSection />
                <FormDetail />
            </div>
            <Footer />
        </div>
    )
}

export default CalculatorDetail