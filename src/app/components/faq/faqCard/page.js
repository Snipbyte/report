"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


const FaqCard = () => {
    const [openIndex, setOpenIndex] = useState(null); // State to manage which question is open

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle visibility
  };

  const questions = [
    {
      question: "Q: What makes IziKemp's simulators unique?",
      answer: "Our simulators use advanced scoring criteria to provide a quick, detailed analysis of your funding potential along with personalized recommendations.",
    },
    {
      question: "Q: Are the consultations really free?",
      answer: "Yes, each new user enjoys a free initial consultation with our experts to discuss potential strategies and financial solutions. ",
    },
    {
      question: "Q: How is my information protected?",
      answer: "We employ advanced security protocols to ensure the confidentiality and safety of all your data.",
    },
  ];
    return (
        <div className='py-20 p-1'>
            <p className='text-4xl text-headingColor font-bold text-center my-8'>FAQ</p>
            <p className='text-sm text-paraColor text-center'>These are the most frequently asked questions.</p>
            <div className='flex items-center justify-center gap-1 mb-10'>
                <p className='text-sm text-paraColor text-center'>If you have any question please </p>
                <Link href="/contactus" className='text-sm underline text-paraColor hover:text-btnColor cursor-pointer'>Contact us.</Link>
            </div>
            <div className='md:w-[800px] w-full mx-auto'>
      {questions.map((item, index) => (
        <div key={index} className='my-4'>
          <div
            className='flex items-center justify-between border-b pb-2 border-black cursor-pointer'
            onClick={() => toggleAnswer(index)} // Toggle the specific answer
          >
            <p className='text-headingColor font-bold'>{item.question}</p>
            {openIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {openIndex === index && (
            <p className='text-paraColor text-sm my-2'>
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
        </div>
    )
}

export default FaqCard