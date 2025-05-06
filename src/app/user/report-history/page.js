"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HistoryTable from "../../components/reportHistory/historyTable/page";
import PlanCard from "../../components/reportHistory/planCard/page";
import UserLayout from "@/app/components/layouts/userLayout/page";
import { useTranslation } from "react-i18next"; // Import useTranslation

const ReportHistory = () => {
  const { t } = useTranslation(); // Get translation function
  const [businessPlans, setBusinessPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // To capture API success message

  const fetchBusinessPlans = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found. Please log in.");
      }

      const response = await axios.get("/api/user/all-plans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.businessPlans && response.data.businessPlans.length > 0) {
        setBusinessPlans(response.data.businessPlans);
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching business plans:", err);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to load business plans.");
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessPlans();
  }, []);

  if (loading) {
    return (
      <UserLayout>
        <div className="p-2">
          <p className="text-3xl font-bold text-headingColor my-4">{t('loading')}</p>
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <div className="p-2">
          <p className="text-3xl font-bold text-red-500 my-4">{t('error')}</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="p-2">
        <p className="text-3xl font-bold text-headingColor my-4">{t('latestHistory')}</p>

        <div className="w-full md:flex block items-center gap-6">
          {businessPlans.length === 0 ? (
            <p>{message || t('noBusinessPlans')}</p> 
          ) : (
            businessPlans.slice(0, 2).map((plan) => (
              <PlanCard
                key={plan._id}
                isprofessioanl={false}
                heading={plan.companyName}
                rate="N/A"
                days={`Established: ${new Date(plan.dateOfEstablishment).toLocaleDateString()}`}
                btn={t('viewDetails')} // Using translation for button text
              />
            ))
          )}
        </div>

        <p className="text-3xl font-bold text-headingColor my-4">{t('reportHistory')}</p>
        <HistoryTable businessPlans={businessPlans} />
      </div>
    </UserLayout>
  );
};

export default ReportHistory;
