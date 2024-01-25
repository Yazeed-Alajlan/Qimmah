import { Card } from "@/components/utils/cards/Card";
import React from "react";
import { IconContext } from "react-icons";
import { FiChevronDown } from "react-icons/fi";

const StockPriceCard = ({ open, close, low, high }) => {
  const priceChange = close - open;
  const percentageChange = ((priceChange / open) * 100).toFixed(2);

  let textClass, borderClass;

  if (priceChange > 0) {
    textClass = "text-success";
    borderClass = "border-success";
  } else if (priceChange < 0) {
    textClass = "text-danger";
    borderClass = "border-danger";
  } else {
    textClass = "text-secondary";
    borderClass = "border-secondary";
  }

  return (
    <Card className="">
      <div className="grid grid-cols-3">
        <div>
          <div>
            الأعلى : <span className="text-primary fw-bold">{high}</span>
          </div>
          <div>
            الأدنى :<span className="text-primary fw-bold">{low}</span>
          </div>
        </div>
        <div>
          <div>
            الإفتتاح : <span className="text-primary fw-bold">{open}</span>
          </div>
          <div>
            الإغلاق : <span className="text-primary fw-bold">{close}</span>
          </div>
        </div>

        <div className="border-s-4 ">
          <div>
            السعر : <span className="text-primary fs-5 fw-bold">{close}</span>
          </div>
          <div className={textClass}>
            {priceChange.toFixed(2)} ({percentageChange}%)
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StockPriceCard;
