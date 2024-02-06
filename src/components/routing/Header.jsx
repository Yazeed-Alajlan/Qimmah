"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbHome, TbTable, TbGitCompare } from "react-icons/tb";
import StocksSearch from "../utils/inputs/StocksSearch";
import { useStocksData } from "@/context/StocksDataContext";
const ActiveMenuLink = ({ children, href }) => {
  const pathname = usePathname();
  const active = href === pathname;
  const { selectedStock, setSelectedStock } = useStocksData();

  return (
    <Link
      href={href}
      className={`link-line-indicator flex justify-self-center items-center text-lg text-primary  gap-2 hover:bg-gray-300 p-2 rounded  ${
        active ? " font-semibold bg-gray-200 " : ""
      }`}
      onClick={() => {
        console.log("SET NULL");
        console.log(selectedStock);
        setSelectedStock(null);
      }}
    >
      {children}
    </Link>
  );
};
const routes = [
  {
    icon: TbHome,
    name: "الرئيسية",
    to: `/`,
  },
  {
    icon: TbTable,
    name: "السوق",
    to: `/stocks`,
  },
  {
    icon: TbGitCompare,
    name: "قارن",
    to: `/comparison`,
  },
  {
    icon: TbGitCompare,
    name: "analysis",
    to: `/technical-analysis`,
  },
  {
    icon: TbGitCompare,
    name: "chart",
    to: `/chart`,
  },
];
const Header = ({ children }) => {
  const [scrolling, setScrolling] = useState(false);
  const controls = useAnimation();
  const pathname = usePathname();

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
    <>
      {pathname === "/chart" ? (
        <></>
      ) : (
        <motion.header
          className="flex justify-evenly container items-center align-middle gap-4 sticky top-0 w-full bg-white p-4"
          initial={{ height: "100px" }}
          animate={controls}
        >
          <div className="flex gap-4">
            {routes.map((route, index) => (
              <ActiveMenuLink key={index} href={route.to}>
                <route.icon />
                {route.name}
              </ActiveMenuLink>
            ))}
          </div>
          <StocksSearch />
        </motion.header>
      )}
    </>
  );
};

export default Header;
