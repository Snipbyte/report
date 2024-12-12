import React from "react";

const BlogContent = ({ content }) => {
  // Check if content is defined
  if (!content) {
    return <p>Loading content...</p>; // Or any loading indicator you prefer
  }

  // Split the description into sentences if content is valid
  const sentences = content.description ? content.description.split(".") : [];

  // Group sentences into chunks of 5
  const groupedSentences = [];
  for (let i = 0; i < sentences.length; i += 5) {
    groupedSentences.push(sentences.slice(i, i + 5).join(". ") + ".");
  }

  return (
    <div className="lg:w-[100%] w-full">
      <p className="md:text-4xl text-2xl text-headingColor font-bold lg:w-[700px] w-full">
        {content.title}
      </p>
      <div className="text-paraColor my-4">
        {groupedSentences.map((group, index) => (
          <React.Fragment key={index}>
            <p>{group.trim()}</p>
            {index < groupedSentences.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default BlogContent;
