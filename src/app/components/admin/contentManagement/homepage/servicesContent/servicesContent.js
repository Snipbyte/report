"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AiOutlineClose } from "react-icons/ai";
import {
  createSection,
  updateSection,
  getSections,
} from "@/app/utils/contentManagement/api";

const ServicesContent = () => {
  const [language, setLanguage] = useState("English");
  const [headings, setHeadings] = useState({
    English: ["", "", "", ""],
    French: ["", "", "", ""],
  });
  const [paragraphs, setParagraphs] = useState({
    English: ["", "", "", "", "", "", "", "", ""],
    French: ["", "", "", "", "", "", "", "", ""],
  });
  const [buttonTexts, setButtonTexts] = useState({
    English: ["", "", "", ""],
    French: ["", "", "", ""],
  });
  const [file, setFile] = useState(null); // For image preview
  const [fileData, setFileData] = useState(null); // Base64 image data
  const [sectionId, setSectionId] = useState(null); // For tracking section (edit mode)
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false); // Disable submit button

  // Fetch data on mount
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const data = await getSections("services-content-about");
        if (data.sections && data.sections.length > 0) {
          const section = data.sections[0];
          setSectionId(section._id);
          setHeadings({
            English: section.headings[0]?.en || ["", "", "", ""],
            French: section.headings[0]?.fr || ["", "", "", ""],
          });
          setParagraphs({
            English: section.paragraphs?.[0]?.en || [
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
            ],
            French: section.paragraphs?.[0]?.fr || [
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
            ],
          });
          setButtonTexts({
            English: section.buttonTexts?.[0]?.en || ["", "", "", ""],
            French: section.buttonTexts?.[0]?.fr || ["", "", "", ""],
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
      headings[language].some((heading) => !heading) ||
      paragraphs[language].some((paragraph) => !paragraph) ||
      buttonTexts[language].some((buttonText) => !buttonText)
    ) {
      alert("All fields must be filled out.");
      return;
    }

    const payload = {
      page: "services-content-about",
      headings: {
        en: headings.English,
        fr: headings.French,
      },
      paragraphs: {
        en: paragraphs.English,
        fr: paragraphs.French,
      },
      buttonTexts: {
        en: buttonTexts.English,
        fr: buttonTexts.French,
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

      {/* Dynamic Headings */}
      {headings[language].map((heading, index) => (
        <div className="w-full lg:w-2/3" key={`heading-${index}`}>
          <input
            type="text"
            value={heading}
            onChange={(e) =>
              setHeadings((prev) => {
                const newHeadings = [...prev[language]];
                newHeadings[index] = e.target.value;
                return { ...prev, [language]: newHeadings };
              })
            }
            placeholder={`Heading ${index + 1} in ${language}`}
            className="outline-none p-2 border rounded-md w-full mb-4"
          />
        </div>
      ))}

      {/* Dynamic Paragraphs */}
      {paragraphs[language].map((paragraph, index) => (
        <div className="w-full lg:w-2/3" key={`paragraph-${index}`}>
          <ReactQuill
            value={paragraph}
            onChange={(value) =>
              setParagraphs((prev) => {
                const newParagraphs = [...prev[language]];
                newParagraphs[index] = value;
                return { ...prev, [language]: newParagraphs };
              })
            }
            theme="snow"
            placeholder={`Paragraph ${index + 1} in ${language}`}
            className="mb-4"
          />
        </div>
      ))}

      {/* Dynamic Button Texts */}
      {buttonTexts[language].map((buttonText, index) => (
        <div className="w-full lg:w-2/3" key={`button-${index}`}>
          <input
            type="text"
            value={buttonText}
            onChange={(e) =>
              setButtonTexts((prev) => {
                const newButtons = [...prev[language]];
                newButtons[index] = e.target.value;
                return { ...prev, [language]: newButtons };
              })
            }
            placeholder={`Button ${index + 1} in ${language}`}
            className="outline-none p-2 border rounded-md w-full mb-4"
          />
        </div>
      ))}

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
          src="/images/cm8.jpg"
          alt="Services Content Image"
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

export default ServicesContent;
