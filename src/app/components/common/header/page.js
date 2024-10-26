"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";

const Header = () => {
  const [shownav, setshownav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef(null); // Reference for the menu
  const headerRef = useRef(null); // Reference for the header
  const { t } = useTranslation();

  const toggleNav = () => {
    setshownav(!shownav);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !headerRef.current.contains(event.target)
    ) {
      setshownav(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.body.style.overflow = shownav ? "hidden" : "auto";

    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set logged-in state based on the token

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [shownav]);

  // Function to handle language switch
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language); // Change language in i18n
    localStorage.setItem("language", language); // Save the selected language in localStorage
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update logged-in state
    window.location.href = "/"; // Redirect to home page after logout
  };

  return (
    <div ref={headerRef}>
      <div className="text-white flex items-center justify-between p-4 bg-desColor">
        <Link href="/">
          <Image
            className="w-24 h-16"
            src="/images/logo.png"
            width={1000}
            height={1000}
            alt="Logo"
          />
        </Link>
        <div className="hidden md:flex gap-4 items-center">
          {isLoggedIn && (
            <Link
              href="/user/dashboard"
              className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300"
            >
              {t("dashboard")}
            </Link>
          )}
           <Link
            href="/landing-page"
            className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300"
          >
            {t("landingPage")}
          </Link>
          <Link
            href="/"
            className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300"
          >
            {t("home")}
          </Link>
          <Link
            href="/about"
            className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300"
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300"
          >
            {t("contact")}
          </Link>
          <Link
            href="/blogs"
            className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300"
          >
            {t("Blogs")}
          </Link>

          <Link
            href="/calculator"
            className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300"
          >
            {t("calcualte")}
          </Link>
          <Link
            href="/pricingplan"
            className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300"
          >
            {t("pricing")}
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          {/* Language Switcher */}
          <button
            onClick={() =>
              handleLanguageChange(i18n.language === "en" ? "fr" : "en")
            }
            className="text-white border-2 p-2 rounded-lg border-white hover:text-black hover:bg-white duration-700"
          >
            {i18n.language === "en" ? "FR" : "EN"}
          </button>

          {/* Conditional rendering based on user login state */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-center border-2 w-full p-2 rounded-lg text-black bg-white duration-700 hover:text-hoverBtnColor"
            >
              {t("logout")}
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-center border-2 w-full p-2 rounded-lg text-black bg-white duration-700 hover:text-hoverBtnColor"
              >
                {t("login")}
              </Link>

              <Link
                href="/signup"
                className="text-center text-white border-2 w-full p-2 rounded-lg border-white hover:text-black hover:bg-white duration-700"
              >
                {t("signup")}
              </Link>
            </>
          )}
        </div>
        <button className="md:hidden" onClick={toggleNav}>
          <CiMenuFries size={30} />
        </button>
      </div>

      {/* For small screens */}
      {shownav && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-40"
          onClick={toggleNav}
        ></div>
      )}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-50 w-64 bg-gradient-to-tl from-desColor via-desColor to-[#0D1F2B] px-6 py-4 flex flex-col items-center transform transition-transform duration-300 ${
          shownav ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        <button
          onClick={toggleNav}
          className="absolute top-4 right-6 text-xl text-white"
        >
          X
        </button>
        <div className="flex flex-col gap-5 mt-20">
          {isLoggedIn && (
            <Link
              href="/user/dashboard"
              className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300 text-white"
            >
              {t("dashboard")}
            </Link>
          )}
           <Link
            href="/landing-page"
            className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300 text-white"
          >
            {t("landingPage")}
          </Link>
          <Link
            href="/"
            className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300 text-white"
          >
            {t("home")}
          </Link>
          <Link
            href="/about"
            className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300 text-white"
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300 text-white"
          >
            {t("contact")}
          </Link>
          <Link
            href="/blogs"
            className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300 text-white"
          >
            {t("blogs")}
          </Link>
          <Link
            href="/pricingplan"
            className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300 text-white"
          >
            {t("pricing")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
