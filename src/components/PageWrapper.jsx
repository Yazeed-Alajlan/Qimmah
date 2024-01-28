import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4  mt-10  ">
      <div className="md:w-3/4 w-full">{children}</div>
    </div>
  );
};

export default PageWrapper;
