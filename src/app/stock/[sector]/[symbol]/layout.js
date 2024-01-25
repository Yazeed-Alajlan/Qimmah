"use client";
import { SidebarSelection } from "@/components/utils/routing/SidebarSelection";
import { getStockInformationData } from "@/services/StocksServices";
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

const ActiveMenuLink = ({ children, href }) => {
  const pathname = usePathname();
  const active = href === pathname;
  return (
    <Link
      href={href}
      className={`hover:bg-gray-100 p-2 rounded block text-sm ${
        active ? "text-black font-semibold" : "text-gray-500"
      }`}
    >
      {children}
    </Link>
  );
};

const StockLayout = ({ children }) => {
  const { symbol, sector } = useParams();
  const stockInformationData = getStockInformationData(symbol);

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
    <div className="flex flex-col container px-24 py-8">
      {stockInformationData ? (
        <div className="flex ">
          <div className="flex flex-col gap-4   basis-3/5">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Link className="text-decoration-none" href={"/companies/all"}>
                  الشركات
                </Link>
                /
                <Link
                  className="text-decoration-none"
                  href={`/companies/${sector}`}
                >
                  {sector}
                </Link>
                /<p>{stockInformationData.tradingNameAr}</p>
              </div>
              <div>
                <h1 className="text-5xl">
                  {stockInformationData.companyNameAR}
                </h1>
              </div>
              <div>
                <Badge
                  title={"اسم التداول"}
                  text={stockInformationData.tradingNameAr}
                />
                <Badge
                  title={"رمز التداول"}
                  text={stockInformationData.symbol}
                />
                <Badge title={"القطاع"} text={sector} />
              </div>
            </div>
          </div>

          <div className="my-auto w-full basis-2/5">
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
      <Divider />
      <div className="flex gap-8 ">
        <aside className="basis-1/5">
          <SidebarSelection routes={myRoutes} />
        </aside>
        <div className=" basis-4/5 min-h-[300px]">{children}</div>
      </div>
    </div>
  );
};

export default StockLayout;

{
  /* <nav>
          <ul className="grid gap-3">
            <li>
              <ActiveMenuLink href={`/stock/${symbol}/information`}>
                info
              </ActiveMenuLink>
            </li>
            <li>
              <ActiveMenuLink href={`/stock/${symbol}/test`}>
                test
              </ActiveMenuLink>
            </li>
          </ul>
        </nav> */
}
