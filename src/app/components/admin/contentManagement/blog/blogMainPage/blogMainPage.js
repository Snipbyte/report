import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import dynamic from "next/dynamic";

// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import {
  createSection,
  updateSection,
  getSections,
} from "@/app/utils/contentManagement/api"; // Assuming these are exported from this path

const BlogMainPage = () => {
  const [language, setLanguage] = useState("English");
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null); // For storing base64 image data
  const [sectionId, setSectionId] = useState(null); // For tracking the section when updating
  const [formData, setFormData] = useState({
    heading: { English: "", French: "" },
    description: { English: "", French: "" },
  });
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Language-specific placeholder
  const placeholder = language === "English" ? "Heading" : "Titre";

  // Fetch existing section data if it exists
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const data = await getSections("blog-page");
        if (data.sections && data.sections.length > 0) {
          const section = data.sections[0];
          setSectionId(section._id);
          setFormData({
            heading: {
              English: section.headings[0]?.en || "",
              French: section.headings[0]?.fr || "",
            },
            description: {
              English: section.descriptions[0]?.en || "",
              French: section.descriptions[0]?.fr || "",
            },
          });
          setFile(section.images?.[0] || null); // Set the existing image
        }
      } catch (error) {
        console.error("Error fetching section data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSection();
  }, []);

  // Save current form data when switching languages
  const saveFormData = () => {
    setFormData((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        [language]: formData.description[language] || "",
      },
    }));
  };

  // Handle language toggle
  const toggleLanguage = (lang) => {
    saveFormData(); // Save current form data
    setLanguage(lang);
  };

  // Handle file selection for upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileData(reader.result.split(",")[1]); // Store base64 image data
        setFile(URL.createObjectURL(selectedFile));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Remove uploaded file preview
  const removeFile = () => {
    setFile(null);
    setFileData(null);
  };

  // Submit form data (create or update)
  const onSubmit = async () => {
    saveFormData(); // Save current form data

    const { heading, description } = formData;

    if (
      !heading.English ||
      !heading.French ||
      !description.English ||
      !description.French
    ) {
      alert("All fields are required.");
      return;
    }

    const payload = {
      page: "blog-page",
      headings: {
        en: heading.English,
        fr: heading.French,
      },
      descriptions: {
        en: description.English,
        fr: description.French,
      },
      images: fileData ? [`data:image/png;base64,${fileData}`] : [],
    };

    setButtonDisabled(true);

    try {
      if (sectionId) {
        await updateSection({ sectionId, ...payload });
        alert("Section updated successfully!");
      } else {
        await createSection(payload);
        alert("Section created successfully!");
      }
    } catch (error) {
      console.error("Error submitting section:", error);
      alert("Failed to save section.");
    } finally {
      setButtonDisabled(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center gap-4 p-4 border-2 my-2">
      {/* Language Toggle Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => toggleLanguage("English")}
          className={`p-2 rounded-md ${
            language === "English"
              ? "bg-btnColor text-white"
              : "bg-blue-500 text-white hover:bg-btnColor"
          }`}
        >
          English
        </button>
        <button
          onClick={() => toggleLanguage("French")}
          className={`p-2 rounded-md ${
            language === "French"
              ? "bg-btnColor text-white"
              : "bg-blue-500 text-white hover:bg-btnColor"
          }`}
        >
          French
        </button>
      </div>

      {/* Input Field and Image Section */}
      <div className="flex gap-2 items-center w-full">
        {/* Input Field with Dynamic Placeholder */}
        <div className="flex flex-col w-full lg:w-[50%]">
          <input
            className="outline-none p-2 border my-2"
            type="text"
            value={formData.heading[language]}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                heading: { ...prev.heading, [language]: e.target.value },
              }))
            }
            placeholder={placeholder}
          />

<div className="w-full mt-4">
        <label className="font-bold text-lg">
          {language === "English" ? "Description" : "Description en Français"}
        </label>
        <ReactQuill
          value={formData.description[language]}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              description: { ...prev.description, [language]: value },
            }))
          }
          theme="snow"
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline"],
              ["link"],
              [{ align: [] }],
              ["image"],
              ["blockquote"],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              ["clean"],
            ],
          }}
          placeholder={
            language === "English"
              ? "Write your description here..."
              : "Écrivez votre description ici..."
          }
        />
      </div>
          {/* File Upload Input */}
          <div className="relative my-2">
            <input
              className="outline-none p-2 border w-full"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {file && (
              <div className="relative mt-2">
                <Image
                  src={file}
                  alt="Uploaded Preview"
                  width={100}
                  height={100}
                  className="rounded-md border"
                />
                <button
                  onClick={removeFile}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <AiOutlineClose />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Image Display (Default Image) */}
        <div className="w-[50%]">
          <Image
            src="/images/blog4.jpg" // Default fixed image
            alt="Fixed Blog Image"
            width={1000}
            height={1000}
            className="rounded-md"
          />
        </div>
      </div>

      {/* React Quill Editor for Description */}
     

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={buttonDisabled}
        className={`px-4 py-2 rounded-md ${
          buttonDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-btnColor text-white hover:bg-hoverBtnColor"
        }`}
      >
        {sectionId ? "Update Section" : "Create Section"}
      </button>
    </div>
  );
};

export default BlogMainPage;
