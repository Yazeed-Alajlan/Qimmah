"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbHome, TbTable, TbGitCompare } from "react-icons/tb";
import { useStocksData } from "@/context/StocksDataContext";
import Image from "next/image";
import StocksSearch from "@/components/utils/inputs/StocksSearch";

const ActiveMenuLink = ({ children, href }) => {
  const pathname = usePathname();
  const active = href === "/" ? pathname === href : pathname.includes(href);
  const { selectedStock, setSelectedStock } = useStocksData();

  return (
    <Link
      href={href}
      className={`link-line-indicator flex  items-center text-2xl  gap-2  px-2  rounded  ${
        active ? "text-primary   " : ""
      }`}
      onClick={() => {
        console.log(selectedStock);
        setSelectedStock(null);
      }}
    >
      {children}
    </Link>
  );
};

const Header = ({ children }) => {
  const [scrolling, setScrolling] = useState(false);
  const controls = useAnimation();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

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
      {pathname.includes("chart") ? (
        <></>
      ) : (
        <div className="w-full bg-white ">
          <motion.header
            className="flex items-center justify-between  md:mx-auto md:w-5/6 w-full  md:px-4 px-2 "
            initial={{ height: "100px" }}
            animate={controls}
          >
            <Link href="/">
              <div className="hover:cursor-pointer flex justify-center items-center">
                <Image src="/Logo.png" alt="me" width="180" height="100" />
              </div>
            </Link>
            <StocksSearch className={"w-1/3"} />
          </motion.header>
        </div>
      )}
    </>
  );
};

export default Header;