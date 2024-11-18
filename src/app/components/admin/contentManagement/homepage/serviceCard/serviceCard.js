import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const ServiceCard = () => {
    const [language, setLanguage] = useState('English'); // Local state for language selection
    const [file, setFile] = useState(null); // State for image preview

    // Placeholder text options based on language
    const placeholders = language === 'English'
        ? ['Heading', 'Description 1', 'Description 2', 'Description 3', 'Button']
        : ['Titre', 'Description 1', 'Description 2', 'Description 3', 'Bouton'];

    // Handle file selection and image preview
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile)); // Create a preview URL for the selected file
        }
    };

    // Remove the selected file
    const removeFile = () => {
        setFile(null);
    };

    return (
        <div className='flex flex-col items-center gap-4 p-4 border my-2'>
            {/* Language Selection Buttons */}
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

            {/* Input Fields with Dynamic Placeholders */}
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

                    {/* File upload input */}
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

                {/* Fixed Main Image */}
                <div className='w-[50%]'>
                    <Image
                        src="/images/cm3.jpg"  // This is the fixed main image
                        alt="Service Card Image"
                        width={500}
                        height={500}
                        className="rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
