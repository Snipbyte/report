import BlogContent from '@/app/components/blogDetail/aboutAuthor/blogContent/page'
import AboutAuthor from '@/app/components/blogDetail/aboutAuthor/page'
import BlogSidebar from '@/app/components/blogDetail/blogSidebar/page'
import VerticalCard from '@/app/components/blogs/verticalCard/page'
import React from 'react'

const BlogDetail = () => {
    return (
        <div className='p-3'>
            <AboutAuthor />
            <div className='lg:flex block my-10'>
                <div className='lg:w-[85%] w-full'>
                    <BlogContent />
                </div>
                <div className='hidden lg:block lg:w-[15%] w-full'>
                    <BlogSidebar />
                </div>
            </div>
            <p className='text-headingColor text-4xl font-bold my-4'>Latest Blog</p>
            <div className='flex flex-wrap my-5 items-center  justify-around'>
                <VerticalCard img="/images/blog1.jpg" heading="UI DESIGN" des="Compelling Design Takes More Than ''Making It Like Stripe''" />
                <VerticalCard img="/images/blog2.jpg" heading="DESIGN PROCESS" des="What is Design Thinking and How It Hacks the Way" />
                <VerticalCard img="/images/blog3.jpg" heading="UX DESIGN" des="Healthcare UX: How Design Can Solve Biggest Challenges" />
            </div>
        </div>
    )
}

export default BlogDetail