import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const PageWrapper = ({ children, className, fullPage }) => {
  const containerClasses = clsx({
    "flex flex-col gap-6  ": true,
    "full-page w-full ": fullPage,
    "page  md:mx-auto md:w-5/6 w-full mt-10 md:px-4 px-2": !fullPage,
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
