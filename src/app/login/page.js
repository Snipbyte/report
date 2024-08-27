import React from 'react'
import FormSection from '../components/login/formSection/page'
import CardSection from '../components/login/cardSection/page'

const Login = () => {
  return (
    <div className='md:flex md:p-20 '>
        <FormSection/>
        {/*  */}
        <CardSection/>
      
        
    </div>
  )
}

export default Login