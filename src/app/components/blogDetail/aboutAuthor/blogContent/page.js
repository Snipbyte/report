import React from "react";

const BlogContent = ({ content }) => {
  // Check if content is defined
  if (!content) {
    return <p>Loading content...</p>; // Or any loading indicator you prefer
  }

  // Split the description into sentences if content is valid
  const sentences = content.description ? content.description.split(".") : [];

  return (
    <div className="lg:w-[950px] w-full">
      <p className="md:text-4xl text-2xl text-headingColor font-bold lg:w-[700px] w-full">
        {content.title}
      </p>
      <div className="text-paraColor my-4">
        {sentences.map((sentence, index) => (
          <React.Fragment key={index}>
            <p>
              {sentence.trim()}
              {sentence ? "." : ""}
            </p>
            {/* Add two line breaks after each sentence except the last one */}
            {index < sentences.length - 1 && <br />}
            {index < sentences.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
      {/* Add more fields as necessary */}
      {/* Example: You can map over the sections if your content structure allows it */}
    </div>
  );
};

export default BlogContent;
