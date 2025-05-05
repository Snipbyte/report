// file: components/UploadBlog.js
"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const UploadBlog = ({ onSuccess }) => {
  const [message, setMessage] = useState(""); // For success or failure message
  const [isError, setIsError] = useState(false); // To differentiate between success and error
  const [imgurl, setImgurl] = useState();
  const [tags, setTags] = useState([]);
  const tagInputRef = useRef(null);
  const inputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgurl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleAddTag = () => {
    const newTag = tagInputRef.current.value.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    tagInputRef.current.value = "";
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const onSubmitBlog = async (data) => {
    try {
      const response = await axios.post("/api/blogs/create", {
        ...data,
        tags,
        thumbnailImage: imgurl,
      });

      setMessage("Blog added successfully.");
      setIsError(false);
      reset();
      setTags([]);
      setImgurl(null);
      if (onSuccess) onSuccess(); // Call the success callback to refresh blog list
    } catch (error) {
      console.error("Error:", error);
      setMessage("Blog not added.");
      setIsError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md h-[80vh] overflow-auto ">
      {/* Success/Failure Message */}
      {message && (
        <div
          className={`p-4 mb-4 text-sm rounded ${
            isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmitBlog)}>
        <div className="mb-4">
          <div
            onClick={handleImageClick}
            className={`bg-cover bg-center w-full h-56 rounded-md ${
              imgurl ? "" : "bg-[url(/images/profileimage.jpeg)]"
            }`}
            style={imgurl ? { backgroundImage: `url(${imgurl})` } : {}}
          >
            <div className="flex justify-center w-full h-full opacity-30 hover:opacity-100 transition ease-out hover:ease-in-out duration-300">
              <button
                type="button"
                className="bg-gradient-to-br from-[#126168] via-[#0E394C] to-[#0D1F2B] p-2 w-full text-sm font-bold rounded-md text-white"
              >
                Upload Image
              </button>
            </div>
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            ref={inputRef}
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="text-xs text-red-500">{errors.image?.message}</div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="text-xs text-red-500">
            {errors.title && "Title is required"}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
          <div className="text-xs text-red-500">
            {errors.description && "Description is required"}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="tags"
              ref={tagInputRef}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="ml-2 px-4 py-2 bg-btnColor text-white rounded-md"
            >
              Add Tag
            </button>
          </div>
          <div className="mt-2 flex flex-wrap">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center mr-2 mb-2 px-3 py-1 bg-gray-200 rounded-md"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-btnColor text-white py-2 px-4 rounded-md"
        >
          Upload Blog
        </button>
      </form>
    </div>
  );
};

export default UploadBlog;
