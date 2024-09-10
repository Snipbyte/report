import React from 'react'
import FormSection from '../components/signUp/formSection/page'
import CardSection from '../components/signUp/cardSection/page'

const Signup = () => {
  return (
    <div className='md:flex md:p-20'>
        <FormSection/>
        <div  className="hidden lg:flex">
        <CardSection/>
        </div>
    </div>
  )
}

export default Signup