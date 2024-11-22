"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import Quill styles

import { AiOutlineClose } from "react-icons/ai";
import {
  createSection,
  updateSection,
  getSections,
} from "@/app/utils/contentManagement/api";

const Testimonials = () => {
  const [language, setLanguage] = useState("English");
  const [heading, setHeading] = useState({ English: "", French: "" });
  const [description, setDescription] = useState({ English: "", French: "" });
  const [name, setName] = useState({ English: "", French: "" });
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [currentEditorContent, setCurrentEditorContent] = useState("");

  // Fetch data on mount
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const data = await getSections("testimonials");
        if (data.sections && data.sections.length > 0) {
          const section = data.sections[0];
          setSectionId(section._id);
          setHeading({
            English: section.headings[0]?.en || "",
            French: section.headings[0]?.fr || "",
          });
          setDescription({
            English: section.descriptions[0]?.en || "",
            French: section.descriptions[0]?.fr || "",
          });
          setName({
            English: section.names?.[0]?.en || "",
            French: section.names?.[0]?.fr || "",
          });
          setFile(section.images?.[0] || null);
          setCurrentEditorContent(section.descriptions[0]?.en || "");
        }
      } catch (error) {
        console.error("Failed to fetch section:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSection();
  }, []);

  // Handle language switch
  const handleLanguageSwitch = (lang) => {
    // Save current editor content to the active language before switching
    setDescription((prev) => ({ ...prev, [language]: currentEditorContent }));
    // Switch language and update editor content
    setLanguage(lang);
    setCurrentEditorContent(description[lang] || "");
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileData(reader.result.split(",")[1]);
        setFile(URL.createObjectURL(selectedFile));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Remove file
  const removeFile = () => {
    setFile(null);
    setFileData(null);
  };

  // Submit data
  const onSubmit = async () => {
    // Synchronize current editor content before submitting
    setDescription((prev) => ({ ...prev, [language]: currentEditorContent }));

    if (!heading.English || !heading.French || !name.English || !name.French) {
      alert("All fields must be filled out.");
      return;
    }

    const payload = {
      page: "testimonials",
      headings: {
        en: heading.English,
        fr: heading.French,
      },
      descriptions: {
        en: description.English,
        fr: description.French,
      },
      names: {
        en: name.English,
        fr: name.French,
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
            type="button"
            onClick={() => handleLanguageSwitch(lang)}
            className={`px-4 py-2 rounded-md ${
              language === lang
                ? "bg-blue-600 text-white"
                : "bg-blue-300 text-black hover:bg-blue-500"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Heading Input */}
      <div className="w-full lg:w-2/3">
        <input
          type="text"
          value={heading[language]}
          onChange={(e) =>
            setHeading((prev) => ({ ...prev, [language]: e.target.value }))
          }
          placeholder={`Heading in ${language}`}
          className="outline-none p-2 border rounded-md w-full mb-4"
        />
      </div>

      {/* Rich Text Editor */}
      <div className="w-full lg:w-2/3">
        <ReactQuill
          value={currentEditorContent}
          onChange={(value) => setCurrentEditorContent(value)}
          theme="snow"
          className="mb-4"
          placeholder={`Write description in ${language}`}
        />
      </div>

      {/* Name Input */}
      <div className="w-full lg:w-2/3">
        <input
          type="text"
          value={name[language]}
          onChange={(e) =>
            setName((prev) => ({ ...prev, [language]: e.target.value }))
          }
          placeholder={`Name in ${language}`}
          className="outline-none p-2 border rounded-md w-full mb-4"
        />
      </div>

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
              type="button"
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
            : "bg-blue-600 text-white hover:bg-blue-500"
        }`}
      >
        {buttonDisabled
          ? "Please wait..."
          : sectionId
          ? "Update Section"
          : "Create Section"}
      </button>
    </div>
  );
};

export default Testimonials;
