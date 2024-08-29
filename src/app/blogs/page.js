import React from 'react'
import HeroSection from '../components/blogs/heroSection/page'
import HorizontalCard from '../components/blogs/horizontalCard/page'
import { FaSearch } from 'react-icons/fa'
import VerticalCard from '../components/blogs/verticalCard/page'
import Header from '../components/common/header/page'
import Footer from '../components/common/footer/page'

const Blogs = () => {
  return (
    <div className='p-5 bg-lightCard'>
      <Header/>
      <HeroSection />
      <HorizontalCard />
      <div className='md:flex block items-center justify-between my-8'>
        <p className='text-3xl font-bold text-headingColor'>All Post</p>
        <div className='flex items-center justify-between bg-white rounded-md p-3 w-72 border shadow-2xl text-sm '>
          <input className='outline-none' placeholder='Search what you want' type='text' />
          <FaSearch className='text-hoverBtnColor' />
        </div>
      </div>
      <div className='flex flex-wrap my-5 items-center  justify-around'>
        <VerticalCard img="/images/blog1.jpg" heading="UI DESIGN" des="Compelling Design Takes More Than ''Making It Like Stripe''" />
        <VerticalCard img="/images/blog2.jpg" heading="DESIGN PROCESS" des="What is Design Thinking and How It Hacks the Way" />
        <VerticalCard img="/images/blog3.jpg" heading="UX DESIGN" des="Healthcare UX: How Design Can Solve Biggest Challenges" />
      </div>
      <Footer/>
    </div>
  )
}

export default Blogs