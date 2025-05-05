"use client"
import UserLayout from "@/app/components/layouts/userLayout/page";
import PaymentCard from "@/app/components/user/Payment/paymentCard/page";
import React from "react";
import { useTranslation } from "react-i18next"; 

const Payment = () => {
  const { t } = useTranslation(); 

  return (
    <UserLayout>
      <div className="p-3">
        <div className="my-4">
          <p className="md:text-3xl text-xl font-bold">{t("payments.title")}</p>
          <p className="text-paraColor text-sm my-1">
            {t("payments.description")}
          </p>
        </div>
        <PaymentCard />
      </div>
    </UserLayout>
  );
};

export default Payment;
