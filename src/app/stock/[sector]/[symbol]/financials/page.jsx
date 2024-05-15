"use client";
import React, { useEffect, useState } from "react";
import { BsCalendar3 } from "react-icons/bs";
import { TbChartBar, TbTable } from "react-icons/tb";

// import FinancialsTable from "./FinancialsTable";
// import ButtonsGroup from "components/utils/buttons/ButtonsGroup";
import FinancialsChart from "./FinancialsChart";
// import Tabs from "components/utils/Tabs";
// import Tab from "components/utils/Tab";
import { Card } from "@/components/utils/cards/Card";
import { useParams } from "next/navigation";
import { Tab, Tabs } from "@/components/utils/tabs/TabsButtons";
import FinancialsTable from "./FinancialsTable";

import { useQuery } from "react-query";
import ButtonGroup from "@/components/utils/buttons/ButtonGroup";
import { getStockFinancials } from "@/services/StockFinancialsServices";

const Financials = () => {
  const { symbol } = useParams();
  const {
    isError,
    isSuccess,
    isLoading,
    data: stockFinancialData,
    error,
  } = useQuery(["stockFinancialData", symbol], () =>
    getStockFinancials(symbol)
  );
  // const { data: stockInformationData } = useQuery(
  //   ["stockInformationData", symbol],
  //   () => fetchStockInformationData(symbol)
  // );
  const [displayAnnual, setDisplayAnnual] = useState(0);
  const [financialData, setFinancialData] = useState();

  useEffect(() => {
    if (stockFinancialData) {
      //       ? stockInformationData.financial.balanceSheetAnnually
      // : stockInformationData.financial.balanceSheetQuarterly,
      setFinancialData({
        // balanceSheet:
        //   displayAnnual === 0
        //     ? stockInformationData.financial.balanceSheetAnnually
        //     : stockInformationData.financial.balanceSheetQuarterly,
        // incomeSheet:
        //   displayAnnual === 0
        //     ? stockInformationData.financial.incomeSheeAnnually
        //     : stockInformationData.financial.incomeSheetQuarterly,
        // cashFlow:
        //   displayAnnual === 0
        //     ? stockInformationData.financial.cashFlowAnnually
        //     : stockInformationData.financial.cashFlowQuarterly,
        balanceSheet:
          displayAnnual === 0
            ? stockFinancialData.balanceSheet
            : stockFinancialData.balanceSheetQuarterly,
        incomeSheet:
          displayAnnual === 0
            ? stockFinancialData.incomeSheet
            : stockFinancialData.incomeSheetQuarterly,
        cashFlow:
          displayAnnual === 0
            ? stockFinancialData.cashFlow
            : stockFinancialData.cashFlowQuarterly,
      });
    }
  }, [stockFinancialData, displayAnnual]);

  const periodButtons = [
    {
      label: "سنوي",
      icon: TbChartBar,
      onClick: () => {
        setDisplayAnnual(0);
      },
    },
    {
      label: "ربع سنوي",
      icon: TbChartBar,
      onClick: () => {
        setDisplayAnnual(1);
      },
    },
  ];

  return (
    <>
      {financialData ? (
        <Card header={"القوائم المالية"}>
          <Tabs>
            <Tab text={"رسم بياني"} icon={TbChartBar}>
              <FinancialsChart stockFinancialData={financialData} />
            </Tab>
            <Tab text={"جدول"} icon={TbTable}>
              <Tabs activeTab={1}>
                <Tab text={"المركز المالي"}>
                  <FinancialsTable
                    title={"المركز المالي"}
                    data={financialData.balanceSheet}
                  />
                </Tab>
                <Tab text={"قائمة الدخل"}>
                  <FinancialsTable
                    title={"قائمة الدخل"}
                    data={financialData.incomeSheet}
                  />
                </Tab>
                <Tab text={"التدفق النقدي"}>
                  <FinancialsTable
                    title={"التدفق النقدي"}
                    data={financialData.cashFlow}
                  />
                </Tab>
              </Tabs>
            </Tab>
            <ButtonGroup
              label={"المدة"}
              icon={BsCalendar3}
              buttons={periodButtons}
              parentSetState={setDisplayAnnual}
            />
          </Tabs>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Financials;
