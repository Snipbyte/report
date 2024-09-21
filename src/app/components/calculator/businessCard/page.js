"use client";

import React from 'react';
import BusinessContent from '../businessContent/page';
import { useTranslation } from "react-i18next";

const calculatorKeys = [
  "calculator1", // Calculez votre paiement sur n'importe quel prêt.
  "calculator2", // Calculateur de ratio de liquidité générale.
  "calculator3", // Calculateur de ratio de liquidité immédiate.
  "calculator4", // Calculateur de ratio d'endettement sur actifs.
  "calculator5", // Calculateur de rendement des actifs.
  "calculator6"  // Calculateur de marge brute.
];

const BusinessCard = () => {
  const { t } = useTranslation();

  return (
    <div className='w-full p-3 mb-4'>
      <div className='lg:flex block flex-wrap'>
        {calculatorKeys.map((key, index) => (
          <div key={index} className='lg:w-1/2 w-full mb-4'>
            {/* Use the t function to get the translated text */}
            <BusinessContent info={t(key)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessCard;
