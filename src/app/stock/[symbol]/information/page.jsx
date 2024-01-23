"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsArrowDown } from "react-icons/bs";
import { Card } from "@/components/utils/cards/Card";
import { useParams } from "next/navigation";
import { getStockInformationData } from "@/services/StocksServices";
const StockInformation = () => {
  const { symbol } = useParams();
  const stockInformationData = getStockInformationData(symbol);

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
        </Card>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default StockInformation;
