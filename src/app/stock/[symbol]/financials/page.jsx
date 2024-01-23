"use client";
import React, { useEffect, useState } from "react";
import { BsCalendar3 } from "react-icons/bs";
import { TbChartBar, TbTable } from "react-icons/tb";

// import FinancialsTable from "./FinancialsTable";
// import ButtonsGroup from "components/utils/buttons/ButtonsGroup";
import FinancialsChart from "./FinancialsChart";
// import Tabs from "components/utils/Tabs";
// import Tab from "components/utils/Tab";
import { getStockFinancialData } from "@/services/StocksServices";
import { Card } from "@/components/utils/cards/Card";
import { useParams } from "next/navigation";
import { Tab, Tabs } from "@/components/utils/tabs/tabs";
import FinancialsTable from "./FinancialsTable";

const Financials = () => {
  const { symbol } = useParams();

  const stockFinancialData = getStockFinancialData(symbol);

  const [displayAnnual, setDisplayAnnual] = useState(0);
  const [financialData, setFinancialData] = useState(
    getStockFinancialData(symbol)
  );

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
      // setFinancialData({
      //   balanceSheet: {
      //     annual: stockFinancialData.balanceSheet,
      //     quarterly: stockFinancialData.balanceSheetQuarterly,
      //   },
      //   incomeSheet: {
      //     annual: stockFinancialData.incomeSheet,
      //     quarterly: stockFinancialData.incomeSheetQuarterly,
      //   },
      //   cashFlow: {
      //     annual: stockFinancialData.cashFlow,
      //     quarterly: stockFinancialData.cashFlowQuarterly,
      //   },
      // });
    }
  }, [stockFinancialData, displayAnnual]);

  const periodButtons = [
    { id: 1, text: "سنوي" },
    { id: 2, text: "ربع سنوي" },
  ];
  return (
    <div>
      {financialData ? (
        <Card className={"w-full "} header={"القوائم المالية"}>
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
    </div>
  );
};

export default Financials;
