"use client";
import { SidebarSelection } from "@/components/utils/routing/SidebarSelection";
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
  const { symbol } = useParams();

  const myRoutes = [
    {
      path: "information",
      icon: TbInfoCircle,
      name: "معلومات السهم",
      to: `/stock/${symbol}/information`,
      // to: `/companies/${sector}/${symbol}/information`,
    },
    {
      path: "financials",
      icon: TbBook,
      name: "القوائم المالية",
      to: `/stock/${symbol}/test`,

      // to: `/companies/${sector}/${symbol}/financials`,
    },
    {
      path: "chart",
      icon: TbChartHistogram,
      name: "تحركات السهم",
      to: `/stock/${symbol}/information`,

      // to: `/companies/${sector}/${symbol}/chart`,
    },
    {
      path: "dividend",
      icon: TbReportMoney,
      name: "التوزيعات",
      to: `/stock/${symbol}/information`,

      // to: `/companies/${sector}/${symbol}/dividend`,
    },
    {
      path: "analysis",
      icon: TbDeviceAnalytics,
      name: "تحليل",
      to: `/stock/${symbol}/information`,

      // to: `/companies/${sector}/${symbol}/analysis`,
    },
  ];

  return (
    <div className="flex gap-8 mt-10 mx-10">
      <aside className="flex-[2]">
        <SidebarSelection routes={myRoutes} />
        {/* <nav>
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
        </nav> */}
      </aside>
      <div className="bg-gray-100 flex-[8] p-4 rounded min-h-[300px]">
        {children}
      </div>
    </div>
  );
};

export default StockLayout;
