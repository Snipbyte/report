// AboutAuthor.js
import Image from "next/image";
import React from "react";

const AboutAuthor = ({
  authorName,
  authorImage,
  postTitle,
  postDate,
  thumbnailImage,
}) => {
  return (
    <div>
      <p className="text-5xl text-headingColor font-bold my-3">
        Welcome to Our Blog!
      </p>

      {/* Use the thumbnailImage prop here */}
      <Image
        className="w-full h-full rounded-3xl lg:w-[350px] mx-auto"
        src={thumbnailImage}
        width={1000}
        height={1000}
        alt="Blog Thumbnail"
      />

      <div className="md:flex block items-center justify-between mt-3 mb-8">
        <div>
          <p className="text-headingColor text-3xl mt-4 font-bold">
            {postTitle}
          </p>
          <p className="text-paraColor text-lg">
            by {authorName} on {postDate}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <Image
            className="w-10 h-10 rounded-full"
            src={authorImage}
            width={1000}
            height={1000}
            alt="Author Image"
          />
          <div>
            <p className="text-paraColor text-md">Written by</p>
            <p className="text-headingColor text-lg">{authorName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAuthor;
