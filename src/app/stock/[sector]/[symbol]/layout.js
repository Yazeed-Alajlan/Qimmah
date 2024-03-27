"use client";
import { SidebarSelection } from "@/components/routing/SidebarSelection";
import { getStockInformationData } from "@/services/FinancialServices";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import {
  TbInfoCircle,
  TbBook,
  TbChartHistogram,
  TbReportMoney,
  TbDeviceAnalytics,
} from "react-icons/tb";
import StockPriceCard from "./utils/StockPriceCard";
import Badge from "@/components/utils/Badge";
import Divider from "@/components/utils/Divider";
import PageWrapper from "@/components/PageWrapper";
import { NavBar } from "@/components/routing/NavBar";
import { useQuery } from "react-query";
import { fetchStockInformationData } from "@/services/FetchServices";

const StockLayout = ({ children }) => {
  const { symbol, sector } = useParams();
  const {
    isError,
    isSuccess,
    isLoading,
    data: stockInformationData,
    error,
  } = useQuery(["stockInformationData", symbol], () =>
    fetchStockInformationData(symbol)
  );
  const myRoutes = [
    {
      path: "information",
      icon: TbInfoCircle,
      name: "معلومات السهم",
      to: `/stock/${sector}/${symbol}/information`,
    },
    {
      path: "financials",
      icon: TbBook,
      name: "القوائم المالية",
      to: `/stock/${sector}/${symbol}/financials`,
    },
    {
      path: "chart",
      icon: TbChartHistogram,
      name: "تحركات السهم",
      to: `/stock/${sector}/${symbol}/chart`,
    },
    {
      path: "dividend",
      icon: TbReportMoney,
      name: "التوزيعات",
      to: `/stock/${sector}/${symbol}/profits_and_distributions`,
    },
    {
      path: "analysis",
      icon: TbDeviceAnalytics,
      name: "تحليل",
      to: `/stock/${sector}/${symbol}/analysis`,
    },
  ];

  return (
    <PageWrapper className="gap-10">
      {stockInformationData ? (
        <div className="flex flex-wrap gap-5 justify-center items-center">
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col gap-8 ">
              <div className="flex gap-4">
                <Link className="text-decoration-none" href={"/companies/all"}>
                  الشركات
                </Link>
                /
                <Link className="text-decoration-none" href={`/companies`}>
                  {stockInformationData.sectorNameAr}
                </Link>
                /<p>{stockInformationData.tradingNameAr}</p>
              </div>
              <div>
                <h1 className="text-4xl ">
                  {stockInformationData.companyNameAR}
                </h1>
              </div>
              <div>
                <Badge
                  size={"lg"}
                  title={"اسم التداول"}
                  text={stockInformationData.tradingNameAr}
                />
                <Badge
                  size={"lg"}
                  title={"رمز التداول"}
                  text={stockInformationData.symbol}
                />
                <Badge
                  size={"lg"}
                  title={"القطاع"}
                  text={stockInformationData.sectorNameAr}
                />
              </div>
            </div>
          </div>

          <div className="my-auto lg:ms-auto">
            <StockPriceCard
              open={
                stockInformationData.summary[
                  stockInformationData.summary.length - 1
                ].open
              }
              close={
                stockInformationData.summary[
                  stockInformationData.summary.length - 1
                ].close
              }
              low={
                stockInformationData.summary[
                  stockInformationData.summary.length - 1
                ].low
              }
              high={
                stockInformationData.summary[
                  stockInformationData.summary.length - 1
                ].high
              }
            />
          </div>
        </div>
      ) : (
        <p>loading</p>
      )}
      <NavBar routes={myRoutes} />
      {/* <aside className="basis-1/5">
          <SidebarSelection routes={myRoutes} />
        </aside> */}
      <>{children}</>
      <div>
        لا نتحمل أي مسؤولية عن محتويات هذه الإفصاحات، ولا نؤكد على دقته أو
        اكتماله، ونخلي مسؤوليتنا صراحةً عن أ ّي خسارة تنتج من جراء نشره، أو عن
        الاعتماد على أ ّي جزء منه. كما يتحمل المصدر منفرداً المسؤولية كاملة عن
        دقة المعلومات الواردة في هذه الإفصاحات، ويقر بأنه اتخذ كافة الإجراءات
        اللازمة -بنا ًء على ما لديه من معلومات وحقائق- للتحقق من عدم وجود أي
        معلومات أو حقائق غير مضمنة في الإفصاح قد يتسبب إغفالها في جعل الإفصاح
        مضللاً أو ناقصاً أو غير دقيق
      </div>
    </PageWrapper>
  );
};

export default StockLayout;
