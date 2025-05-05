import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import {
  createSection,
  updateSection,
  getSections,
} from "@/app/utils/contentManagement/api";

const SimulationCard = () => {
  const [language, setLanguage] = useState("English");
  const [formData, setFormData] = useState({
    English: { description: "", buttonText: "" },
    French: { description: "", buttonText: "" },
  });
  const [file, setFile] = useState(null); // For file preview
  const [fileData, setFileData] = useState(null); // For base64 file data
  const [sectionId, setSectionId] = useState(null); // Track section for editing
  const [loading, setLoading] = useState(true); // Track API call status
  const [buttonDisabled, setButtonDisabled] = useState(false); // Disable button during submission

  // Fetch existing section data on mount
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const data = await getSections("simulation");
        if (data.sections && data.sections.length > 0) {
          const section = data.sections[0]; // Assuming one section
          setSectionId(section._id); // Set ID for editing
          setFormData({
            English: {
              description: section.descriptions[0].en || "",
              buttonText: section.buttonTexts[0]?.en || "",
            },
            French: {
              description: section.descriptions[0].fr || "",
              buttonText: section.buttonTexts[0]?.fr || "",
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

  const validateForm = () => {
    const currentData = formData[language];
    return currentData.description.trim() && currentData.buttonText.trim();
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill in all fields.");
      return;
    }

    setButtonDisabled(true);

    const formattedData = {
      page: "simulation",
      descriptions: {
        en: formData.English.description,
        fr: formData.French.description,
      },
      buttonTexts: {
        en: formData.English.buttonText,
        fr: formData.French.buttonText,
      },
      images: fileData ? [`data:image/png;base64,${fileData}`] : [],
    };

    try {
      if (sectionId) {
        // Update section
        await updateSection({ sectionId, ...formattedData });
        alert("Section updated successfully!");
      } else {
        // Create section
        await createSection(formattedData);
        alert("Section created successfully!");
      }
    } catch (error) {
      console.error("Error saving section:", error);
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
            name="description"
            value={formData[language].description}
            onChange={handleInputChange}
            className="outline-none p-3 border rounded-md mb-2"
            type="text"
            placeholder={`Description (${language})`}
          />

          <input
            name="buttonText"
            value={formData[language].buttonText}
            onChange={handleInputChange}
            className="outline-none p-3 border rounded-md mb-2"
            type="text"
            placeholder={`Button Text (${language})`}
          />

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

        <div className="w-full lg:w-1/2">
          <Image
            src="/images/landingpage2.jpg"
            alt="Simulation Card Image"
            width={500}
            height={500}
            className="rounded-md"
          />
        </div>
      </div>

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

export default SimulationCard;
