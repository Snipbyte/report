// BlogSidebar.js
import React from "react";

const BlogSidebar = ({ tags }) => {
  return (
    <div>
      <p className="text-headingColor text-xl font-bold mt-8 mb-4">Tags</p>
      {tags.map((tag, index) => (
        <p
          key={index}
          className="text-btnColor hover:text-hoverBtnColor underline mt-2 cursor-pointer"
        >
          {tag}
        </p>
      ))}
    </div>
  );
};

export default BlogSidebar;
