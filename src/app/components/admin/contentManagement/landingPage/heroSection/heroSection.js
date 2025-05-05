import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import {
  createSection,
  updateSection,
  getSections,
} from "@/app/utils/contentManagement/api";

const HeroSection = () => {
  const [language, setLanguage] = useState("English");
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [sectionId, setSectionId] = useState(null); // To track if editing an existing section
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    English: {
      headings: "",
      descriptions: "",
    },
    French: {
      headings: "",
      descriptions: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch existing section data on component mount
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const data = await getSections("landing");
        if (data.sections && data.sections.length > 0) {
          const section = data.sections[0]; // Assuming only one section
          setSectionId(section._id); // Set ID for editing
          setFormData({
            English: {
              headings: section.headings[0].en || "",
              descriptions: section.descriptions[0].en || "",
            },
            French: {
              headings: section.headings[0].fr || "",
              descriptions: section.descriptions[0].fr || "",
            },
          });
          if (section.images && section.images.length > 0) {
            setFile(`${section.images[section.images.length - 1]}`); 
          }
        }
      } catch (error) {
        console.error("Failed to fetch section:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSection();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [language]: {
        ...prev[language],
        [name]: value,
      },
    }));
  };

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

  const removeFile = () => {
    setFile(null);
    setFileData(null);
  };

  const onSubmit = async () => {
    const formattedData = {
      page: "landing",
      headings: {
        en: formData.English.headings,
        fr: formData.French.headings,
      },
      descriptions: {
        en: formData.English.descriptions,
        fr: formData.French.descriptions,
      },
      images: fileData ? [`data:image/png;base64,${fileData}`] : [],
    };

    try {
      if (sectionId) {
        // Edit existing section
        const response = await updateSection({ sectionId, ...formattedData });
        alert("Section updated successfully!");
      } else {
        // Create new section
        const response = await createSection(formattedData);
        alert("Section created successfully!");
      }
    } catch (error) {
      console.error("Error saving section:", error);
      alert("Failed to save section.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-6 p-4 border-2 rounded-md my-4"
    >
      {/* Language Toggle */}
      <div className="flex gap-4">
        {["English", "French"].map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
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

      {/* Form Fields */}
      <div className="flex flex-col w-full lg:flex-row gap-6 items-start">
        <div className="flex flex-col flex-1">
          <input
            name="headings"
            value={formData[language].headings}
            onChange={handleInputChange}
            className="outline-none p-3 border rounded-md mb-2"
            type="text"
            placeholder={`Heading (${language})`}
          />
          {errors.headings && (
            <span className="text-red-500">{`${language} heading is required.`}</span>
          )}

          <textarea
            name="descriptions"
            value={formData[language].descriptions}
            onChange={handleInputChange}
            className="outline-none p-3 border rounded-md mb-2"
            rows={3}
            placeholder={`Description (${language})`}
          />
          {errors.descriptions && (
            <span className="text-red-500">{`${language} description is required.`}</span>
          )}

          <input
            className="outline-none p-3 border rounded-md mb-2"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
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
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-btnColor text-white rounded-md hover:bg-hoverBtnColor"
      >
        {sectionId ? "Update Section" : "Create Section"}
      </button>
    </form>
  );
};

export default HeroSection;
