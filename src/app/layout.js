"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import i18n from "../../i18n";
import { FaArrowUp } from "react-icons/fa"; // Import the scroll-to-top icon

export default function RootLayout({ children }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [showScroll, setShowScroll] = useState(false);

  // Set the language of i18next based on the current router locale or stored language
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage); // Set language from localStorage if available
    } else if (router.locale) {
      i18n.changeLanguage(router.locale); // Fallback to the router locale
    }
  }, [router.locale]);

  // Scroll to top functionality
  const handleScroll = () => {
    if (window.scrollY > 300) {
      // Button will appear after scrolling 300px from the top
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang={i18n.language}>
      {" "}
      {/* Dynamically set the lang attribute */}
      <body className="font-poppins relative">
        {children}
        {/* Scroll-to-top button */}
        {showScroll && (
          <button
            className="fixed bottom-10 right-10 p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 shadow-lg"
            onClick={scrollToTop}
          >
            <FaArrowUp size={20} />
          </button>
        )}
      </body>
    </html>
  );
}
