"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import dynamic from "next/dynamic";

// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import {
  createSection,
  updateSection,
  getSections,
} from "@/app/utils/contentManagement/api";

const AboutMainPage = () => {
  const [language, setLanguage] = useState("English");
  const [file, setFile] = useState(null); // For image preview
  const [fileData, setFileData] = useState(null); // Base64 image data
  const [sectionId, setSectionId] = useState(null); // For tracking section (edit mode)
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false); // Disable submit button
  const [formData, setFormData] = useState({
    heading: { English: "", French: "" },
    description: { English: "", French: "" },
  });
  const [currentEditorContent, setCurrentEditorContent] = useState("");

  // Fetch section data
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const data = await getSections("about-page");
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
          setFile(section.images?.[0] || null);
          setCurrentEditorContent(section.descriptions[0]?.en || ""); // Default to English
        }
      } catch (error) {
        console.error("Error fetching section data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSection();
  }, []);

  // Save current editor content
  const saveEditorContent = () => {
    setFormData((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        [language]: currentEditorContent,
      },
    }));
  };

  // Handle language toggle
  const toggleLanguage = (lang) => {
    saveEditorContent(); // Save current editor content
    setLanguage(lang);
    setCurrentEditorContent(formData.description[lang] || ""); // Load new content
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileData(reader.result.split(",")[1]); // Base64
        setFile(URL.createObjectURL(selectedFile));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Remove uploaded file
  const removeFile = () => {
    setFile(null);
    setFileData(null);
  };

  // Submit handler
  const onSubmit = async () => {
    saveEditorContent(); // Save editor content

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
      page: "about-page",
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
    <div className="flex flex-col items-center gap-6 p-4 border-2 rounded-md my-4">
      {/* Language Toggle */}
      <div className="flex gap-4">
        {["English", "French"].map((lang) => (
          <button
            key={lang}
            onClick={() => toggleLanguage(lang)}
            className={`px-4 py-2 rounded-md ${
              language === lang
                ? "bg-btnColor text-white"
                : "bg-blue-300 hover:bg-hoverBtnColor"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Inputs for Current Language */}
      <div className="w-full lg:w-2/3">
        <input
          type="text"
          value={formData.heading[language]}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              heading: { ...prev.heading, [language]: e.target.value },
            }))
          }
          placeholder={`Heading in ${language}`}
          className="outline-none p-2 border rounded-md w-full mb-4"
        />
      </div>

      {/* Rich Text Editor for Description */}
      <ReactQuill
        value={currentEditorContent}
        onChange={(value) => setCurrentEditorContent(value)}
        theme="snow"
        className="w-full lg:w-2/3 mb-4"
        placeholder={`Description in ${language}`}
      />

      {/* File Upload */}
      <div className="w-full lg:w-2/3">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mb-2 border p-2"
        />
        {file && (
          <div className="relative w-24 h-24 mt-2">
            <Image
              src={file}
              alt="Preview"
              layout="fill"
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

export default AboutMainPage;
