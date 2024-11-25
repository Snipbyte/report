// file: components/blogs/verticalCard/page.js

import Image from "next/image";
import Link from "next/link";
import React from "react";

const VerticalCard = (props) => {
  return (
    <Link href={`/blog-detail/${props.slug}`} className="w-96 block">
      <Image
        className="rounded-t-3xl h-60"
        src={props.img}
        width={1000}
        height={1000}
        alt={props.heading}
      />
      <div className="border p-2">
        <p className="my-2 text-hoverBtnColor font-bold text-md">
          {props.heading}
        </p>
        <Link
          href={`/blog-detail/${props.slug}`}
          className="text-headingColor font-bold text-xl"
        >
          {props.des}
        </Link>
      </div>
    </Link>
  );
};

export default VerticalCard;
