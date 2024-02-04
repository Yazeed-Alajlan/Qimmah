import React from "react";

const PageWrapper = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col   md:mx-auto  gap-6 container  md:px-4 px-2  md:w-5/6 w- w-full mt-10 ${className} `}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className="w-full">
          {child}
        </div>
      ))}
    </div>
  );
};

export default PageWrapper;
