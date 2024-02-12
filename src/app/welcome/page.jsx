import StocksSearch from "@/components/utils/inputs/StocksSearch";
import React from "react";

const page = () => {
  return (
    <>
      <h1 className="text-center text-3xl">
        معلومات السوق السعودي , أدوات مالية ذكية , بيانات الشركات التاريخية ,
        مؤشرات مالية
      </h1>
      <div className="flex justify-center">
        <StocksSearch className={"w-2/3"} />
      </div>
    </>
  );
};

export default page;
