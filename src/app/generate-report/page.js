// pages/generate-report.js

"use client";
import GenerateReportForm from "../components/generateReportForm/page";
import { useTranslation } from "react-i18next";

const GenerateReportPage = () => {
  const { t } = useTranslation(); 
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="max-w-4xl w-full p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        {t("generate")}
        </h1>
        <GenerateReportForm />
      </div>
    </div>
  );
};

export default GenerateReportPage;
