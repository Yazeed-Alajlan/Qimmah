"use client";
import PageWrapper from "@/components/PageWrapper";
import Button from "@/components/utils/buttons/Button";
import { Card } from "@/components/utils/cards/Card";
import Input from "@/components/utils/inputs/Input";
import StocksSearch from "@/components/utils/inputs/StocksSearch";
import { calculateNewTASIWithSymbol } from "@/services/UtilityServices";
import React, { useState } from "react";
import { useQuery } from "react-query";

const Page = () => {
  const [newPrice, setNewPrice] = useState(0);
  const [symbol, setSymbol] = useState();

  const {
    isError,
    isSuccess,
    isLoading,
    data: newTASIValue,
    error,
    isRefetching,
    refetch,
  } = useQuery(
    ["newTASIValue"],
    () => calculateNewTASIWithSymbol(symbol, newPrice),
    { enabled: false }
  );

  const handleSearchClick = () => {
    // Trigger refetch only when the submit button is clicked
    refetch();
  };
  return (
    <PageWrapper className={"gap-10"}>
      <Card>
        <div className="flex sm:flex-wrap lg:flex-nowrap items-center content-center gap-6 ">
          <StocksSearch
            label={"إختر سهم"}
            className={"w-full"}
            onStockSelect={(data) => setSymbol(data?.value)}
          />
          <Input
            label={"السعر المتوقع:"}
            labelDirection="hr"
            type={"number"}
            value={newPrice}
            onChange={(event) => {
              setNewPrice(event.target.value);
            }}
            placeholder="أدخل السعر المتوقع"
          />

          <Button text={"ابحث"} onClick={handleSearchClick} />
        </div>
      </Card>
      {isRefetching || isLoading ? (
        <Card className="flex justify-center items-center">
          <p className="text-gray-600">Loading...</p>
        </Card>
      ) : (
        <Card className="flex justify-center items-center flex-col text-center">
          <div className="text-2xl">
            قيمة تاسي الجديدة:
            <span className="font-semibold">
              {newTASIValue?.newTASI.toFixed(2)}
            </span>
          </div>
          <div className="text-2xl">
            التغيير:
            <span className="font-semibold">
              {newTASIValue?.change.toFixed(2)}
            </span>
          </div>
          <div className="text-2xl">
            وزن السهم:
            <span className="font-semibold">
              {newTASIValue?.stockWeight.toFixed(2)}
            </span>
          </div>
        </Card>
      )}
    </PageWrapper>
  );
};

export default Page;
