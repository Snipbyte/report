import Image from "next/image";
import Link from "next/link";
import React from "react";

const HorizontalCard = ({ img, heading, des, tags = [], slug }) => {
  // Default value for tags
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
          {Array.isArray(tags) && tags.length > 0 ? ( // Check if tags is an array
            tags.map((tag, index) => (
              <span
                key={index}
                className="bg-hoverBtnColor text-white rounded-full px-3 py-1 text-sm font-semibold"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-gray-400">No tags available</span> // Fallback if no tags
          )}
        </div>
        <Link
          href={`/blog-detail/${slug}`}
          className="text-headingColor font-bold text-3xl"
        >
          {heading}
        </Link>
        {des && <p className="text-paraColor my-4">{des}</p>}
      </div>
    </div>
  );
};

export default HorizontalCard;
