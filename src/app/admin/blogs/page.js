"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/app/components/layouts/adminLayout/page";
import UploadBlog from "@/app/components/admin/blogs/uploadBlog/uploadBlog";
import EditBlog from "@/app/components/admin/blogs/editBlog/editBlog";
import Link from "next/link";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBlogData, setEditBlogData] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.post("/api/blogs/all");
      setBlogs(response.data);
      setFilteredBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setMessage("Failed to fetch blogs");
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredBlogs(
      blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(value) ||
          blog.description.toLowerCase().includes(value)
      )
    );
  };

  // Handle blog deletion
  const handleDelete = async (slug) => {
    try {
      await axios.post("/api/blogs/deleteblog", { slug });
      setMessage("Blog deleted successfully.");
      setIsError(false);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      setMessage("Failed to delete blog");
      setIsError(true);
    }
  };

  // Open edit modal
  const handleEdit = (blog) => {
    setEditBlogData(blog);
    setShowEditModal(true);
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

        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search blogs by title or description..."
          className="border p-2 w-full mb-4"
        />

        {/* Blogs Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Title
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr key={blog.slug} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    <Link
                      href={`/blog-detail/${blog.slug}`}
                      className="text-blue-500 hover:underline"
                    >
                      {blog.title}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
  {blog.description.length > 200
    ? `${blog.description.slice(0, 200)}...`
    : blog.description}
</td>

                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(blog.slug)}
                      className="bg-red-500 my-2 text-white py-1 px-3 rounded-md mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(blog)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-md"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Blog Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Add New Blog
          </button>
        </div>

        {/* Modal for Adding New Blog */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500"
              >
                &times;
              </button>
              <UploadBlog
                onSuccess={() => {
                  setShowModal(false);
                  fetchBlogs();
                  setMessage("Blog added successfully.");
                  setIsError(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Modal for Editing Blog */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-2 right-2 text-gray-500"
              >
                &times;
              </button>
              <EditBlog
                blogData={editBlogData}
                onSuccess={() => {
                  setShowEditModal(false);
                  fetchBlogs();
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
