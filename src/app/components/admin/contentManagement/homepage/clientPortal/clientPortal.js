"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import Quill styles

import { AiOutlineClose } from "react-icons/ai";
import {
  createSection,
  updateSection,
  getSections,
} from "@/app/utils/contentManagement/api";

const ClientPortal = () => {
  const [language, setLanguage] = useState("English");
  const [heading, setHeading] = useState({ English: "", French: "" });
  const [descriptions, setDescriptions] = useState({
    English: ["", ""],
    French: ["", ""],
  });
  const [buttonText, setButtonText] = useState({ English: "", French: "" });
  const [file, setFile] = useState(null); // For image preview
  const [fileData, setFileData] = useState(null); // Base64 image data
  const [sectionId, setSectionId] = useState(null); // For tracking section (edit mode)
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false); // Disable submit button

  // Fetch data on mount
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const data = await getSections("client-portal-about");
        if (data.sections && data.sections.length > 0) {
          const section = data.sections[0];
          setSectionId(section._id);
          setHeading({
            English: section.headings[0]?.en || "",
            French: section.headings[0]?.fr || "",
          });
          setDescriptions({
            English: [
              section.descriptions[0]?.en || "",
              section.descriptions[1]?.en || "",
            ],
            French: [
              section.descriptions[0]?.fr || "",
              section.descriptions[1]?.fr || "",
            ],
          });
          setButtonText({
            English: section.buttonTexts?.[0]?.en || "",
            French: section.buttonTexts?.[0]?.fr || "",
          });
          setFile(section.images?.[0] || null);
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
    setLanguage(lang);
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
    if (
      !heading.English ||
      !heading.French ||
      !descriptions.English.every(Boolean) ||
      !descriptions.French.every(Boolean) ||
      !buttonText.English ||
      !buttonText.French
    ) {
      alert("All fields must be filled out.");
      return;
    }

    const payload = {
      page: "client-portal-about",
      headings: {
        en: heading.English,
        fr: heading.French,
      },
      descriptions: {
        en: descriptions.English,
        fr: descriptions.French,
      },
      buttonTexts: {
        en: buttonText.English,
        fr: buttonText.French,
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
                  ? "bg-btnColor text-white"
                : "bg-blue-300 text-black hover:bg-hoverBtnColor hover:text-white duration-300"
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

      {/* Dynamic Descriptions */}
      {descriptions[language].map((desc, index) => (
        <div className="w-full lg:w-2/3" key={`description-${index}`}>
          <ReactQuill
            value={desc}
            onChange={(value) =>
              setDescriptions((prev) => {
                const newDescriptions = [...prev[language]];
                newDescriptions[index] = value;
                return { ...prev, [language]: newDescriptions };
              })
            }
            theme="snow"
            placeholder={`Description ${index + 1} in ${language}`}
            className="mb-4"
          />
        </div>
      ))}

      {/* Button Text Input */}
      <div className="w-full lg:w-2/3">
        <input
          type="text"
          value={buttonText[language]}
          onChange={(e) =>
            setButtonText((prev) => ({ ...prev, [language]: e.target.value }))
          }
          placeholder={`Button text in ${language}`}
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

      {/* Default Image */}
      <div className="w-full lg:w-1/2">
        <Image
          src="/images/cm9.jpg"
          alt="Client Portal Image"
          width={500}
          height={500}
          className="rounded-md"
        />
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
        {buttonDisabled
          ? "Please wait..."
          : sectionId
          ? "Update Section"
          : "Create Section"}
      </button>
    </div>
  );
};

export default ClientPortal;
