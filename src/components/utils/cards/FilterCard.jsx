import React from "react";
import { Card } from "./Card";

const FilterCard = ({ children }) => {
  return (
    <Card className={"mb-8"}>
      <div className="flex w-full">{children}</div>
    </Card>
  );
};

export default FilterCard;
