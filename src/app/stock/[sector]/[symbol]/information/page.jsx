"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsArrowDown } from "react-icons/bs";
import { Card } from "@/components/utils/cards/Card";
import { useParams } from "next/navigation";
import { fetchStockInformationData } from "@/services/FetchServices";
import { useQuery } from "react-query";
import { Tab, Tabs } from "@/components/utils/tabs/TabsButtons";
import { TbChartBar, TbTable } from "react-icons/tb";

const StockInformation = () => {
  const { symbol } = useParams();
  const {
    isError,
    isSuccess,
    isLoading,
    data: stockInformationData,
    error,
  } = useQuery(["stockInformationData", symbol], () =>
    fetchStockInformationData(symbol)
  );
  return (
    <>
      {stockInformationData ? (
        <Card className={"gap-4"} header={"معلومات السهم"}>
          <div className="">
            <div>
              <div>
                <table className="" responsive>
                  <tbody>
                    <tr>
                      <th>القيمة السوقية</th>
                      <th>
                        {
                          stockInformationData.summary[0]
                            .daily_price_to_earnings
                        }
                      </th>
                    </tr>
                    <tr>
                      <th>ربحية السهم EPS</th>
                      <th>
                        {
                          stockInformationData.summary[0]
                            .basic_earnings_per_share_ttm
                        }
                      </th>
                    </tr>
                    <tr>
                      <th>مكرر الربحية</th>
                      <th>
                        {
                          stockInformationData.summary[0]
                            .daily_price_to_earnings
                        }
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table className="" responsive>
                  <tbody>
                    <tr>
                      <th>مضاعف القيمة الدفترية</th>
                      <th>
                        {
                          stockInformationData.summary[0]
                            .basic_earnings_per_share_ttm
                        }
                      </th>
                    </tr>
                    <tr>
                      <th>القيمة الدفترية</th>
                      <th>
                        {
                          stockInformationData.summary[0]
                            .book_value_per_share_ttm
                        }
                      </th>
                    </tr>
                    <tr>
                      <th> رأس المال المصرّح</th>
                      <th>
                        {stockInformationData.capital?.[0]?.newCApital ?? "N/A"}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Tabs>
            <Tab text={"asdasdaaa"} icon={TbChartBar}>
              000{" "}
            </Tab>
            <Tab text={"asdasdaaa"} icon={TbTable}>
              <Tabs activeTab={1}>
                <Tab text={"المركز ssالمالي"}>111</Tab>
                <Tab text={"قائمة الدخل"}>222 </Tab>
                <Tab text={"التدفق النقدي"}>333</Tab>
              </Tabs>
            </Tab>
          </Tabs>
          {/* <ButtonsGroup
              label={"المدة"}
              icon={<BsCalendar3 />}
              buttons={periodButtons}
              parentSetState={setDisplayAnnual}
            /> */}
        </Card>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default StockInformation;
