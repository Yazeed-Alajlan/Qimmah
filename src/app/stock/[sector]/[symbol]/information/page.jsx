"use client";
import React from "react";
import { Card } from "@/components/utils/cards/Card";
import { useParams } from "next/navigation";
import { fetchStockInformationData } from "@/services/FetchServices";
import { useQuery } from "react-query";
import List from "./List";
import ButtonGroup from "@/components/utils/buttons/ButtonGroup";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import Text from "@/components/Text";
import Table from "@/components/utils/table/Table";

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
  console.log(stockInformationData);
  const data = [
    {
      name: "القيمة السوقية",
      info: "daily",
      value: stockInformationData?.summary[0]?.daily_price_to_earnings,
    },
    {
      name: "ربحية السهم EPS",
      info: "daily",
      value: stockInformationData?.summary[0]?.basic_earnings_per_share_ttm,
    },
    {
      name: "مكرر الربحية",
      info: "daily",
      value: stockInformationData?.summary[0]?.daily_price_to_earnings,
    },
    {
      name: "القيمة الدفترية",
      info: "daily",
      value: stockInformationData?.summary[0]?.book_value_per_share_ttm,
    },
    {
      name: "مضاعف القيمة الدفترية",
      info: "daily",
      value: stockInformationData?.summary[0]?.basic_earnings_per_share_ttm,
    },
    {
      name: "نسبة التوزيعات النقدية",
      info: "daily",
      value: stockInformationData?.summary[0]?.daily_price_to_earnings,
    },
    {
      name: "رأس المال المصرّح",
      info: "daily",
      value: stockInformationData?.capital?.[0]?.newCApital ?? "N/A",
    },
  ];
  const data2 = [
    {
      name: "القيمة السوقية",
      info: "daily",
      value: stockInformationData?.summary[0]?.daily_price_to_earnings,
    },
    {
      name: "ربحية السهم EPS",
      info: "daily",
      value: stockInformationData?.summary[0]?.basic_earnings_per_share_ttm,
    },
    {
      name: "مكرر الربحية",
      info: "daily",
      value: stockInformationData?.summary[0]?.daily_price_to_earnings,
    },
  ];

  const periodButtons = [
    {
      label: "المؤشرات المالية",
      render: () => <List data={data} />,
    },
    {
      label: "التغيير",
      render: () => <List data={data2} />,
    },
  ];
  const shareholdingButtons = [
    {
      label: "أعضاء مجلس الإدارة",
      render: () => (
        <Table
          tableData={
            stockInformationData.shareholdingInformation.boardOfDirectors
          }
          tableColumns={[
            {
              Header: "المساهمون",
              accessor: "shareholders",
            },
            {
              Header: "المنصب",
              accessor: "designation",
            },
            {
              Header: "التاريخ",
              accessor: "tradingDate",
            },
            {
              Header: "الأسهم المملوكة في آخر تاريخ",
              accessor: "sharesHeldTradingDay",
            },
            {
              Header: "الأسهم المملوكة في يوم التداول السابق	",
              accessor: "sharesHeldPrevTradingDay",
            },
            {
              Header: "التغير",
              accessor: "change",
            },
          ]}
        />
      ),
    },

    {
      label: "الملكية الأجنبية",
      render: () => (
        <>
          <div>
            <span>ملكيه جميع المستثمرين الاجانب</span>
            <span>{" (عدا ملكية المستثمر الاستراتيجي الأجنبي) "}</span>
            <Text
              title={"الملكية الفعلية (%)"}
              text={
                stockInformationData.shareholdingInformation.foreignOwnership[0]
                  .totalForeignOwnership.actualPercentage
              }
            />
            <Text
              title={"الحد الاعلى (%)"}
              text={
                stockInformationData.shareholdingInformation.foreignOwnership[0]
                  .totalForeignOwnership.maximumLimit
              }
            />
          </div>

          <Text
            title={"ملكية المستثمر الاستراتيجي الأجنبي"}
            text={
              stockInformationData.shareholdingInformation.foreignOwnership[0]
                .foreignStrategicInvestorsOwnership.actualPercentage
            }
          />
          {/* {console.log(
            stockInformationData.shareholdingInformation.foreignOwnership[0]
              .foreignStrategicInvestorsOwnership.actualPercentage
          )} */}
          <div>
            تاريخ آخر تحديث
            <span>
              {
                stockInformationData.shareholdingInformation.foreignOwnership[0]
                  .date
              }{" "}
            </span>
          </div>
          {/* {} */}
        </>
      ),
    },
    {
      label: "المساهمون الكبار",
      render: () => (
        <Table
          tableData={
            stockInformationData.shareholdingInformation.majorShareHolders
          }
          tableColumns={[
            {
              Header: "shareholders",
              accessor: "shareholders",
            },
            {
              Header: "tradingDate",
              accessor: "tradingDate",
            },
            {
              Header: "sharesHeldPrevTradingDay",
              accessor: "sharesHeldPrevTradingDay",
            },
            {
              Header: "sharesHeldTradingDay",
              accessor: "sharesHeldTradingDay",
            },

            {
              Header: "change",
              accessor: "change",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      {stockInformationData ? (
        <>
          <div className="flex flex-col flex-wrap gap-8">
            <div className="grid grid-cols-5 gap-4 ">
              <div className="md:col-span-3 col-span-5">
                <Card header="تحركات السهم">
                  <StockPriceChart symbol={symbol} />
                </Card>
              </div>
              <div className="md:col-span-2 col-span-5 ">
                <Card>
                  <ButtonGroup buttons={periodButtons} />
                </Card>
              </div>
            </div>
            <Card header={"ملف السهم"}>
              <div className="flex  gap-4 flex-wrap">
                {console.log(stockInformationData.equityProfile[0])}
                {Object.entries(stockInformationData.equityProfile[0]).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col flex-grow text-center border-l-2 border-primary h-28 p-2 gap-4"
                    >
                      <span>{key} </span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  )
                )}
              </div>
            </Card>
            <Card className={"flex flex-col gap-4 "} header={"ملف الشركة"}>
              <Text
                title="نبذة عن نشاط الشركة"
                text={stockInformationData.companyProfile.companyOverview}
              />
              <Text
                title="نبذة عن تاريخ الشركة"
                text={stockInformationData.companyProfile.companyHistory}
              />
              <Text
                title="تاريخ التأسيس"
                text={stockInformationData.companyProfile.DateEstablished}
              />
              <Text
                title="تاريخ الادراج"
                text={stockInformationData.companyProfile.ListingDate}
              />
              <Text
                title="نهاية السنة المالية"
                text={stockInformationData.companyProfile.FinancialYearEnd}
              />
              <Text
                title="المدققون الخارجيون"
                text={stockInformationData.companyProfile.ExternalAuditors}
              />
            </Card>
            <Card header={"معلومات عن نسبة التملك"}>
              <ButtonGroup buttons={shareholdingButtons} />
            </Card>
            <Card header={"الشركات التابعة"}>
              <Table
                isScrollable
                tableData={stockInformationData.subsidiary}
                tableColumns={[
                  {
                    Header: "اسم الشركة التابعة",
                    accessor: "nameOfSubsidiary",
                  },
                  {
                    Header: "نسبة الملكية",
                    accessor: "percentageOfProperty",
                  },
                  {
                    Header: "النشاط الرئيسي",
                    accessor: "mainBusiness",
                  },
                  {
                    Header: "مكان العمليات",
                    accessor: "locationOfOperation",
                  },
                  {
                    Header: "مكان التأسيس",
                    accessor: "countryOfOperation",
                  },
                ]}
              />
            </Card>
          </div>
        </>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default StockInformation;
