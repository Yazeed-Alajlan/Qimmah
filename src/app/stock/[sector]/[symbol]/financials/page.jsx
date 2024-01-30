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
import { Tab, Tabs } from "@/components/utils/tabs/Tabs";
import FinancialsTable from "./FinancialsTable";
import { fetchStockFinancialData } from "@/services/FetchServices";
import { useQuery } from "react-query";

const Financials = () => {
  const { symbol } = useParams();
  const {
    isError,
    isSuccess,
    isLoading,
    data: stockFinancialData,
    error,
  } = useQuery(["stockFinancialData", symbol], () =>
    fetchStockFinancialData(symbol)
  );

  const [displayAnnual, setDisplayAnnual] = useState(0);
  const [financialData, setFinancialData] = useState();

  useEffect(() => {
    if (stockFinancialData) {
      setFinancialData({
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
    { id: 1, text: "سنوي" },
    { id: 2, text: "ربع سنوي" },
  ];
  return (
    <>
      {financialData ? (
        <Card header={"القوائم المالية"}>
          <Tabs>
            <Tab label={"رسم بياني"} icon={TbChartBar}>
              <FinancialsChart stockFinancialData={financialData} />
            </Tab>
            <Tab label={"جدول"} icon={TbTable}>
              <Tabs activeTab={1}>
                <Tab label={"المركز المالي"}>
                  <FinancialsTable
                    title={"المركز المالي"}
                    data={financialData.balanceSheet}
                  />
                </Tab>
                <Tab label={"قائمة الدخل"}>
                  <FinancialsTable
                    title={"قائمة الدخل"}
                    data={financialData.incomeSheet}
                  />
                </Tab>
                <Tab label={"التدفق النقدي"}>
                  <FinancialsTable
                    title={"التدفق النقدي"}
                    data={financialData.cashFlow}
                  />
                </Tab>
              </Tabs>
            </Tab>
            {/* <ButtonsGroup
                label={"المدة"}
                icon={<BsCalendar3 />}
                buttons={periodButtons}
                parentSetState={setDisplayAnnual}
              /> */}
          </Tabs>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Financials;
