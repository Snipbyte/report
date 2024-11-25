"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "../components/blogs/heroSection/page";
import HorizontalCard from "../components/blogs/horizontalCard/page";
import VerticalCard from "../components/blogs/verticalCard/page";
import Header from "../components/common/header/page";
import Footer from "../components/common/footer/page";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.post("/api/blogs/all");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Filtered blogs based on search term
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const latestBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const remainingBlogs = filteredBlogs.slice(0);

  return (
    <div className="bg-lightCard p-1">
      <Header />
      <HeroSection />

      {/* Display latest blog in HorizontalCard */}
      {latestBlog && (
        <HorizontalCard
          img={latestBlog.thumbnailImage || "/images/horizontalimage.jpg"}
          heading={latestBlog.title}
          tags={latestBlog.tags || []}
          slug={latestBlog.slug}
        />
      )}

      <section className="my-8 px-4">
        <div className="md:flex block items-center justify-between">
          <p className="lg:text-5xl text-2xl font-bold text-headingColor">
            All Posts
          </p>
          <div className="flex items-center bg-white rounded-md p-3 w-full md:w-72 border shadow-2xl text-sm">
            <input
              className="outline-none w-full"
              placeholder="Search what you want"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="text-hoverBtnColor ml-2" />
          </div>
        </div>
      </section>

      {/* Display remaining blogs in VerticalCards */}
      <section className="flex flex-wrap my-5 items-center justify-center px-4">
        {remainingBlogs.length > 0 ? (
          remainingBlogs.map((blog) => (
            <VerticalCard
              key={blog.slug}
              img={blog.thumbnailImage || "/images/blog-placeholder.jpg"}
              heading={blog.title}
              des={
                blog.description.slice(0, 200) +
                (blog.description.length > 200 ? "" : "")
              }
              slug={blog.slug}
            />
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;
