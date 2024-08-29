// src/components/Breadcrumb.js
"use client";
import Link from "next/link";
import React from "react";

const Breadcrumb = ({ pageName, pageLink }) => {
  return (
    <div
      className="relative bg-cover bg-center py-20"
      style={{ backgroundImage: "url(/images/breadCrumb.jpg)" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto px-4 text-center text-white">
        <h1 className="text-3xl font-bold">{pageName}</h1>
        <nav className="text-sm mt-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href={pageLink} className="hover:underline">
            {pageName}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
