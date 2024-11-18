import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';

const AboutMainPage = () => {
    const [language, setLanguage] = useState('English'); // Language state
    const [file, setFile] = useState(null); // File state for image preview

    // Placeholders based on the selected language
    const placeholders = language === 'English'
        ? ['Heading', 'Description 1', 'Heading 2', 'Heading 3', 'Paragraph 1', 'Paragraph 2', 'Paragraph 3', 'Paragraph 4']
        : ['Titre', 'Description 1', 'Titre 2', 'Titre 3', 'Paragraphe 1', 'Paragraphe 2', 'Paragraphe 3', 'Paragraphe 4'];

    // Handle file selection and image preview
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile));
        }
    };

    // Remove the selected file
    const removeFile = () => {
        setFile(null);
    };

    return (
        <div className='flex flex-col items-center gap-4 p-4 border my-2'>
            {/* Language Toggle Buttons */}
            <div className='flex gap-2'>
                <button
                    onClick={() => setLanguage('English')}
                    className={`p-2 rounded-md ${language === 'English' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    English
                </button>
                <button
                    onClick={() => setLanguage('French')}
                    className={`p-2 rounded-md ${language === 'French' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    French
                </button>
            </div>

            {/* Input Fields and File Upload */}
            <div className='flex gap-2 items-center w-full'>
                <div className='flex flex-col w-full lg:w-[50%]'>
                    {placeholders.map((placeholder, index) => (
                        <input
                            key={index}
                            className='outline-none p-2 border my-2'
                            type='text'
                            placeholder={placeholder}
                        />
                    ))}
                    <div className='relative my-2'>
                        <input 
                            className='outline-none p-2 border w-full' 
                            type='file' 
                            accept="image/*" 
                            onChange={handleFileChange} 
                        />
                        {file && (
                            <div className='relative mt-2'>
                                <Image
                                    src={file}
                                    alt="Preview"
                                    width={100}
                                    height={100}
                                    className="rounded-md border"
                                />
                                <button onClick={removeFile} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2 hover:bg-red-600">
                                    <AiOutlineClose className="text-xl" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Static Image */}
                <Image className='w-[50%]' src="/images/about.png" width={500} height={500} alt="About Page Image" />
            </div>
        </div>
    );
};

export default AboutMainPage;
