import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Import close icon for removing uploaded image

const GuidanceCard = () => {
    const [language, setLanguage] = useState('English');
    const [file, setFile] = useState(null); // State to store uploaded image preview

    // Language placeholder options
    const placeholders = language === 'English'
        ? ['Heading', 'Description 1', 'Description 2', 'Description 3', 'Description 4', 'Description 5']
        : ['Titre', 'Description en français 1', 'Description en français 2', 'Description en français 3', 'Description en français 4', 'Description en français 5'];

    // Handle file selection for upload
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile)); // Set file URL for preview
        }
    };

    // Remove uploaded file preview
    const removeFile = () => {
        setFile(null); // Reset preview when user removes the image
    };

    return (
        <div className='flex flex-col items-center gap-4 p-4 border-2 my-2'>
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

            {/* Input Fields and Image Section */}
            <div className='flex gap-2 items-center w-full'>
                {/* Input Fields with Dynamic Placeholders */}
                <div className='flex flex-col w-full lg:w-[50%]'>
                    {placeholders.map((placeholder, index) => (
                        <input 
                            key={index} 
                            className='outline-none p-2 border my-2' 
                            type='text' 
                            placeholder={placeholder} 
                        />
                    ))}

                    {/* File Upload Input */}
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
                                <button onClick={removeFile} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
                                    <AiOutlineClose />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Fixed Image (Remains Unchanged) */}
                <div className='w-[50%]'>
                    <Image
                        src="/images/landingpage4.jpg" // Fixed image that does not change
                        alt="Guidance Card Image"
                        width={1000}
                        height={1000}
                        className="rounded-md"
                    />
                </div>
            </div>
        </div>
    );
}

export default GuidanceCard;
