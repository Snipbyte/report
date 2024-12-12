"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTags } from "react-icons/fa";
import { useForm } from "react-hook-form";

const BlogSidebar = ({ tags = [] }) => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch latest blogs for the sidebar
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.post("/api/blogs/all");
        setRecentBlogs(response.data.slice(0, 3)); // Take the top 3 latest blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Function to handle newsletter form submission
  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post("/api/admin/addnewsletter", {
        email: data.email,
      });

      if (response.status === 201) {
        setSuccess("You have successfully subscribed to the newsletter!");
        reset(); // Reset form fields after successful submission
      } else {
        setError("Subscription failed. Please try again.");
      }
    } catch (err) {
      setError("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Tags Section */}
      <p className="text-headingColor text-xl font-bold my-4">Tags</p>
      {Array.isArray(tags) && tags.length > 0 ? (
        tags.map((tag, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <FaTags className="text-btnColor" />
            <p className="text-btnColor hover:text-hoverBtnColor underline cursor-pointer">
              {tag}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No tags available</p>
      )}

      {/* Recent Posts Section - Dynamically loaded from API */}
      <p className="text-headingColor text-xl font-bold mt-8 mb-4">
        Recent Posts
      </p>
      <ul className="space-y-2">
        {recentBlogs.length > 0 ? (
          recentBlogs.map((blog, index) => (
            <li key={blog.slug} className="flex items-center space-x-2">
              <p className="text-btnColor text-lg">{index + 1}.</p>
              <a
                href={`/blog/${blog.slug}`} // Assuming you have a detailed blog page
                className="text-btnColor hover:text-hoverBtnColor cursor-pointer"
              >
                {/* Truncate title to 100 characters */}
                {blog.title.length > 60
                  ? `${blog.title.slice(0, 60)}...`
                  : blog.title}
              </a>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No recent posts available</p>
        )}
      </ul>

      {/* Newsletter Signup Section */}
      <p className="text-headingColor text-xl font-bold mt-8 mb-4">
        Newsletter Signup
      </p>
      <p className="text-gray-400 mb-4">
        Stay updated with the latest blog posts and news. Subscribe to our
        newsletter!
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mb-4">
        <input
          type="email"
          placeholder="Your Email"
          className="p-2 w-full rounded border border-gray-300"
          {...register("email", { required: true })}
        />
        <button
          type="submit"
          className="w-full p-2 bg-btnColor text-white rounded hover:bg-hoverBtnColor"
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {success && <p className="text-green-500 mt-2">{success}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default BlogSidebar;
