"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PricingCards from "../components/pricingPlan/pricingCards/page";
import Header from "../components/common/header/page";
import Footer from "../components/common/footer/page";

const PricingPlan = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch plans data
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("/api/admin/plans/getAll");
        console.log(response.data); // For debugging API response
        setPlans(response.data.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to load plans. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-wrap justify-center items-center">
        {isLoading ? (
          <p>Loading plans...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          plans.map((plan) => {
            // Normalize points data
            const points = Array.isArray(plan.points)
              ? plan.points.flatMap((p) =>
                  typeof p === "string" ? p.split(",") : p
                )
              : [];

            return (
              <PricingCards
                key={plan._id}
                planId={plan._id}
                num={plan.price}
                des={plan.description}
                points={points} // Pass all points as a single array
                isPopular={plan.isPopular}
                productlink={plan.productLink || "https://example.com"}
              />
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PricingPlan;
