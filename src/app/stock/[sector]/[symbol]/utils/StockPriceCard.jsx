import { Card } from "@/components/utils/cards/Card";
import React from "react";

const StockPriceCard = ({ open, close, low, high }) => {
  const priceChange = close - open;
  const percentageChange = ((priceChange / open) * 100).toFixed(2);

  let textClass, bgClass;

  if (priceChange > 0) {
    textClass = "text-success";
    bgClass = "bg-success";
  } else if (priceChange < 0) {
    textClass = "text-danger";
    bgClass = "bg-danger";
  } else {
    textClass = "text-gray-500";
    bgClass = "bg-gray-500";
  }

  return (
    <Card className={"px-6"} size={"sm"}>
      <div className="grid grid-cols-10">
        <div className="col-span-3 ">
          <div className="flex">
            <div> الأعلى :</div>
            <div className="text-primary fw-bold mx-auto">{high}</div>
          </div>
          <div className="flex">
            <div> الأدنى :</div>
            <div className="text-primary fw-bold mx-auto">{low}</div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex">
            <div> الإفتتاح :</div>
            <div className="text-primary fw-bold mx-auto">{open}</div>
          </div>
          <div className="flex">
            <div> الإغلاق :</div>
            <div className="text-primary fw-bold mx-auto">{close}</div>
          </div>
        </div>
        <div className="flex items-center justify-center  col-span-1">
          <span className={"h-full w-1/12 " + bgClass}></span>
        </div>
        <div className="col-span-3">
          <div className="flex">
            <div> السعر :</div>
            <div className="text-primary fw-bold mx-auto">{close}</div>
          </div>
          <div className="flex">
            <div className={textClass}>
              {priceChange.toFixed(2)} ({percentageChange}%)
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StockPriceCard;
