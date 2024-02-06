import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const PageWrapper = ({ children, className, fullPage }) => {
  const containerClasses = clsx({
    "PAGE WRAPPER flex flex-col md:mx-auto gap-6 container md:w-5/6 w-full mt-10 md:px-4 px-2": true,
    "md:w-full m-0 md:mt-0 md:px-0 px-0": fullPage,
  });

  console.log(containerClasses);
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
