import Image from "next/image";
import React from "react";

const AboutAuthor = ({
  authorName = "Website Admin", // Provide default values
  authorImage = "/images/default-author.jpg", // Default author image
  postTitle = "Post Title", // Default post title
  postDate = "Date", // Default post date
  thumbnailImage = "/images/default-thumbnail.jpg", // Default thumbnail image
}) => {
  return (
    <div>
      <p className="lg:text-5xl text-2xl text-headingColor font-bold my-3">
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

      <div className="md:flex block items-center gap-10 mt-3 mb-8">
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <Image
            className="w-12 h-12 rounded-full"
            src={authorImage}
            width={1000}
            height={1000}
            alt="Author Image"
          />
          <div>
            <p className="text-paraColor lg:text-lg text-sm">Written by</p>
            <p className="text-headingColor lg:text-lg text-sm font-bold">{authorName}</p>
          </div>
        </div>
        <div className="lg:border-l lg:pl-10 my-2 lg:my-0">
          <p className="text-headingColor lg:text-3xl text-2xl font-bold">
            {postTitle}
          </p>
          <p className="text-paraColor lg:text-lg text-sm">
            by {authorName} on {postDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutAuthor;
