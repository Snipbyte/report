import React from 'react'
import HeroSection from '../components/blogs/heroSection/page'
import HorizontalCard from '../components/blogs/horizontalCard/page'
import { FaSearch } from 'react-icons/fa'
import VerticalCard from '../components/blogs/verticalCard/page'
import Header from '../components/common/header/page'
import Footer from '../components/common/footer/page'

const Blogs = () => {
  return (
    <div className='bg-lightCard p-1'>
  <Header />
  <HeroSection />
  <HorizontalCard />

  <section className='my-8 px-4'>
    <div className='md:flex block items-center justify-between'>
      <p className='lg:text-5xl text-2xl font-bold text-headingColor'>All Posts</p>
      <div className='flex items-center bg-white rounded-md p-3 w-full md:w-72 border shadow-2xl text-sm'>
        <input className='outline-none w-full' placeholder='Search what you want' type='text' />
        <FaSearch className='text-hoverBtnColor ml-2' />
      </div>
    </div>
  </section>

  <section className='flex flex-wrap my-5 items-center justify-center px-4'>
    <VerticalCard
      img="/images/blog1.jpg"
      heading="UI DESIGN"
      des="Compelling Design Takes More Than 'Making It Like Stripe'"
    />
    <VerticalCard
      img="/images/blog2.jpg"
      heading="DESIGN PROCESS"
      des="What is Design Thinking and How It Hacks the Way"
    />
    <VerticalCard
      img="/images/blog3.jpg"
      heading="UX DESIGN"
      des="Healthcare UX: How Design Can Solve Biggest Challenges"
    />
  </section>

  <Footer />
</div>

  )
}

export default Blogs