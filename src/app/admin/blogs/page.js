"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/app/components/layouts/adminLayout/page";
import UploadBlog from "@/app/components/admin/blogs/uploadBlog/uploadBlog";
import EditBlog from "@/app/components/admin/blogs/editBlog/editBlog"; // NEW
import Link from "next/link";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false); // To toggle the blog pop-up
  const [showEditModal, setShowEditModal] = useState(false); // NEW: Modal for editing blog
  const [editBlogData, setEditBlogData] = useState(null); // NEW: Data for the blog being edited
  const [message, setMessage] = useState(""); // Custom success or error message
  const [isError, setIsError] = useState(false); // To determine if it's a success or failure

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.post("/api/blogs/all");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setMessage("Failed to fetch blogs");
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle blog deletion
  const handleDelete = async (slug) => {
    try {
      await axios.post("/api/blogs/deleteblog", { slug });
      setMessage("Blog deleted successfully.");
      setIsError(false);
      fetchBlogs(); // Refresh the blog list after deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
      setMessage("Failed to delete blog");
      setIsError(true);
    }
  };

  // NEW: Open edit modal and set blog data
  const handleEdit = (blog) => {
    setEditBlogData(blog); // Set the blog data to be edited
    setShowEditModal(true); // Open edit modal
  };

  return (
    <AdminLayout>
      {message && (
        <div
          className={`p-4 mb-4 text-sm rounded ${
            isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Blogs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.slug}
              className="bg-white p-4 shadow-md rounded-lg relative"
            >
              <Link
                href={`/blog-detail/${blog.slug}`}
                className="text-lg font-bold"
              >
                {blog.title}
              </Link>
              <p className="text-sm text-gray-500">{blog.description}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded-md"
                  onClick={() => handleDelete(blog.slug)}
                >
                  Delete
                </button>
                {/* Edit Button */}
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded-md"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Button to open modal for adding a new blog */}
        <div className="mt-6">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={() => setShowModal(true)}
          >
            Add New Blog
          </button>
        </div>

        {/* Modal for adding a new blog */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <UploadBlog
                onSuccess={() => {
                  setShowModal(false);
                  fetchBlogs(); // Refresh blog list after adding new one
                  setMessage("Blog added successfully.");
                  setIsError(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Modal for editing a blog */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={() => setShowEditModal(false)}
              >
                &times;
              </button>
              <EditBlog
                blogData={editBlogData}
                onSuccess={() => {
                  setShowEditModal(false);
                  fetchBlogs(); // Refresh blog list after editing
                  setMessage("Blog edited successfully.");
                  setIsError(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Blogs;
