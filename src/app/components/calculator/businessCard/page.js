import React from 'react';
import BusinessContent from '../businessContent/page';

const calculatorNames = [
  "Calculate Your Payment on any loan",
  "Current Ratio Calculator",
  "Quick Ratio Calculator",
  "Debt-to-Assets Ratio Calculator",
  "Return on Assets Calculator",
  "Gross Profit Margin Calculator"
];

const BusinessCard = () => {
  return (
    <div className='w-full p-3 mb-4'>
      <div className='lg:flex block flex-wrap'>
        {calculatorNames.map((name, index) => (
          <div key={index} className='lg:w-1/2 w-full mb-4'>
            <BusinessContent info={name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessCard;
