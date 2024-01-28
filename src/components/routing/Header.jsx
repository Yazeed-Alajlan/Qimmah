"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
      className={`link-line-indicator flex justify-self-center items-center text-lg text-primary  gap-2 hover:bg-gray-300 p-2 rounded  ${
        active ? " font-semibold bg-gray-200 " : ""
      }`}
    >
      {children}
    </Link>
  );
};
const routes = [
  {
    path: "information",
    icon: TbInfoCircle,
    name: "معلومات السهم",
    to: `/stocks/`,
  },
  {
    path: "financials",
    icon: TbBook,
    name: "القوائم المالية",
    to: `/stocks/`,
  },
  {
    path: "chart",
    icon: TbChartHistogram,
    name: "تحركات السهم",
    to: `/stocks/`,
  },
  {
    path: "dividend",
    icon: TbReportMoney,
    name: "التوزيعات",
    to: `/stocks/`,
  },
  {
    path: "analysis",
    icon: TbDeviceAnalytics,
    name: "تحليل",
    to: `/stocks/`,
  },
];
const Header = ({ children }) => {
  const [scrolling, setScrolling] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 200; // Adjust the scroll threshold as needed

      if (window.scrollY > 0) {
        if (!scrolling) {
          setScrolling(true);
          controls.start({ height: "75px" }); // Adjust the desired height
        }
      } else {
        if (scrolling) {
          setScrolling(false);
          controls.start({ height: "100px" }); // Adjust the original height
        }
      }
      if (window.scrollY > scrollThreshold) {
        controls.start({ height: "0px" }); // Adjust the height when scrolled below the threshold
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolling, controls]);

  return (
    <motion.header
      className="flex justify-center items-center align-middle sticky top-0 w-full bg-white p-4"
      initial={{ height: "100px" }} // Adjust the original height
      animate={controls}
    >
      <div className="flex gap-4">
        {routes.map((route, index) => (
          <ActiveMenuLink
            href={route.to} // Using the 'to' property from the route object
          >
            <route.icon />
            {route.name}
          </ActiveMenuLink>
        ))}
      </div>

      {/* {children} */}
    </motion.header>
  );
};

export default Header;
