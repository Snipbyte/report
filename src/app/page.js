"use client";
import React from "react";

import { useTranslation } from "react-i18next";
import TestTwoMainPage from "./components/testTwo/testTwoMainPage/testTwoMainPage";

const Test = () => {
  const { t } = useTranslation();

  return (
   
    <TestTwoMainPage />
  );
};

export default Test;
