import React from "react";

const PageWrapper = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col  justify-center items-center content-center md:mx-auto mx-4 gap-6  md:w-3/4 w-full mt-10 ${className} `}
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
