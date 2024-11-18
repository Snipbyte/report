import React, { useState } from 'react'
import Image from 'next/image'
import { AiOutlineClose } from 'react-icons/ai'

const SimulationCard = () => {
    const [language, setLanguage] = useState('English'); // Local state for language
    const [file, setFile] = useState(null); // File state for image preview

    // Language placeholder options
    const placeholders = language === 'English' 
        ? ['Heading', 'Paragraph 1', 'Paragraph 2', 'Paragraph 3', 'Button']
        : ['Titre', 'Paragraphe 1', 'Paragraphe 2', 'Paragraphe 3', 'Bouton'];

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
                <Image className='w-[50%]' src="/images/cm1.jpg" width={500} height={500} alt="Simulation Card Image"/>
            </div>
        </div>
    );
}

export default SimulationCard;
