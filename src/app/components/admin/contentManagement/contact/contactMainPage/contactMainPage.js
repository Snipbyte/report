import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const ContactMainPage = () => {
    const [language, setLanguage] = useState('English');
    const [file, setFile] = useState(null);

    // Language-specific placeholders
    const placeholders = language === 'English'
        ? ['Heading', 'Description', 'Contact Number', 'Email Address', 'Button']
        : ['Titre', 'Description en français', 'Numéro de contact', 'Adresse e-mail', 'Bouton'];

    // Handle file selection for upload
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile));
        }
    };

    // Remove uploaded file preview
    const removeFile = () => {
        setFile(null);
    };

    return (
        <div className='flex flex-col items-center gap-4 p-4 border-2 my-2'>
            {/* Language Toggle Buttons */}
            <div className='flex gap-2 mb-4'>
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
                                    alt="Uploaded Preview"
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

                {/* Fixed Image Display (Default Image) */}
                <div className='w-[50%]'>
                    <Image
                        src="/images/contact3.jpg" // Default fixed image
                        alt="Fixed Image"
                        width={1000}
                        height={1000}
                        className="rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactMainPage;
