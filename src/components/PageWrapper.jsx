import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const PageWrapper = ({ children, className, fullPage }) => {
  const containerClasses = clsx(
    {
      "flex flex-col items-center content-center": true,
      "full-page w-full": fullPage,
      "page md:mx-auto md:w-5/6 w-full mt-10 mb-20 md:px-4 px-2": !fullPage,
    },
    twMerge(className, {
      "gap-6": true,
    })
  );

  return (
    <div className={containerClasses}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="w-full">
          {child}
        </div>
      ))}
    </div>
  );
};

export default PageWrapper;
