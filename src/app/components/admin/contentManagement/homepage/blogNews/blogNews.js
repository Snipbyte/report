import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const BlogNews = () => {
    const [language, setLanguage] = useState('English');
    const [file, setFile] = useState(null); // State to store the selected file

    // Dynamic placeholders based on language selection
    const placeholders = language === 'English'
        ? ['Heading', 'Description 1', 'Description 2', 'Button']
        : ['Titre', 'Description 1', 'Description 2', 'Bouton'];

    // Handle file selection and image preview
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile)); // Generate a URL for the selected file
        }
    };

    // Remove the selected file
    const removeFile = () => {
        setFile(null); // Reset file state to null
    };

    return (
        <div className='flex flex-col items-center border-2 p-4 my-4'>
            {/* Language Toggle Buttons */}
            <div className='flex gap-2 mb-4'>
                <button
                    onClick={() => setLanguage('English')}
                    className={`p-2 rounded-md ${language === 'English' ? 'bg-btnColor text-white' : 'bg-blue-500 text-white hover:bg-btnColor'}`}
                >
                    English
                </button>
                <button
                    onClick={() => setLanguage('French')}
                    className={`p-2 rounded-md ${language === 'French' ? 'bg-btnColor text-white' : 'bg-blue-500 text-white hover:bg-btnColor'}`}
                >
                    French
                </button>
            </div>

            {/* Input Fields with Dynamic Placeholders */}
            <div className='flex gap-2 items-center w-full'>
                <div className='flex flex-col w-full lg:w-[50%]'>
                    {placeholders.map((placeholder, index) => (
                        <input
                            key={index}
                            className='outline-none p-2 border my-2'
                            type='text'
                            placeholder={placeholder} // Applying dynamic placeholder
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

                {/* Default Image Always Visible */}
                <div className='w-[50%]'>
                    {/* Default Image is always shown */}
                    <Image 
                        src="/images/cm7.jpg" // Always show the default image
                        alt="Blog News Image"
                        width={500} 
                        height={500} 
                        className="rounded-md"
                    />
                </div>
            </div>
        </div>
    );
}

export default BlogNews;
