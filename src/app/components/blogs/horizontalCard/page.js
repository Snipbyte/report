// file: components/blogs/horizontalCard/page.js

import Image from "next/image";
import Link from "next/link";
import React from "react";

const HorizontalCard = ({ img, heading, des, tags, slug }) => {
  return (
    <div className="md:flex block bg-white">
      <div className="md:w-1/2 w-full">
        <Image
          className="md:rounded-r-[40px] w-full h-96"
          src={img}
          width={1000}
          height={1000}
          alt={heading}
        />
      </div>
      <div className="md:w-1/2 w-full p-10">
        {/* Display tags with styling */}
        <div className="flex flex-wrap space-x-2 my-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-hoverBtnColor text-white rounded-full px-3 py-1 text-sm font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/blog-detail/${slug}`}
          className="text-headingColor font-bold text-3xl"
        >
          {heading}
        </Link>
        <p className="text-paraColor my-4">{des}</p>
      </div>
    </div>
  );
};

export default HorizontalCard;
