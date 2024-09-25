import React from "react";

const BlogSidebar = ({ tags = [] }) => { // Default value for tags
  return (
    <div>
      <p className="text-headingColor text-xl font-bold mt-8 mb-4">Tags</p>
      {Array.isArray(tags) && tags.length > 0 ? ( // Check if tags is an array
        tags.map((tag, index) => (
          <p
            key={index}
            className="text-btnColor hover:text-hoverBtnColor underline mt-2 cursor-pointer"
          >
            {tag}
          </p>
        ))
      ) : (
        <p className="text-gray-400">No tags available</p> // Fallback if no tags
      )}
    </div>
  );
};

export default BlogSidebar;
