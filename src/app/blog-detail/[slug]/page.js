"use client";
import BlogContent from "@/app/components/blogDetail/aboutAuthor/blogContent/page";
import AboutAuthor from "@/app/components/blogDetail/aboutAuthor/page";
import BlogSidebar from "@/app/components/blogDetail/blogSidebar/page";
import VerticalCard from "@/app/components/blogs/verticalCard/page";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/app/components/common/header/page";
import Footer from "@/app/components/common/footer/page";

const BlogDetail = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const slug = parts[parts.length - 1];
  const [blogs, setBlogs] = useState([]);
  const [blogContent, setBlogContent] = useState(null);

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs/all");
        // Ensure that response.data is an array
        setBlogs(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Fetch single blog detail based on slug
  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const response = await axios.post(`/api/blogs/singleblogdetail`, {
          slug,
        });
        setBlogContent(response.data.blog); // Update to match your API response
      } catch (error) {
        console.error("Error fetching single blog:", error);
      }
    };

    fetchSingleBlog();
  }, [slug]);

  return (
    <>
      <Header />
      <div className="p-3">
        <AboutAuthor
          authorName="Website Admin" // Pass dynamic values if needed
          authorImage="/images/girlimage.jpg" // Update as necessary
          postTitle={blogContent ? blogContent.title : "Post Title"} // Change to actual title
          postDate={
            blogContent
              ? new Date(blogContent.publishDate).toLocaleDateString()
              : "Date"
          } // Format date as needed
          thumbnailImage={
            blogContent
              ? blogContent.thumbnailImage
              : "/images/default-thumbnail.jpg"
          } // Pass the thumbnail image
        />
        <div className="lg:flex block my-10">
          <div className="lg:w-[85%] w-full">
            {blogContent ? (
              <BlogContent content={blogContent} />
            ) : (
              <p>Loading blog content...</p>
            )}
          </div>
          <div className="hidden lg:block lg:w-[15%] w-full">
            <BlogSidebar tags={blogContent ? blogContent.tags : []} />
          </div>
        </div>

        <p className="text-headingColor text-4xl font-bold my-4">Latest Blog</p>
        <div className="flex flex-wrap my-5 items-center justify-around">
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.slice(0, 3).map((blog) => (
              <VerticalCard
                key={blog.slug}
                img={blog.thumbnailImage || "/images/blog-placeholder.jpg"}
                heading={blog.title}
                des={blog.description}
              />
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
