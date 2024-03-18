"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbHome, TbTable, TbGitCompare } from "react-icons/tb";
import StocksSearch from "../utils/inputs/StocksSearch";
import { useStocksData } from "@/context/StocksDataContext";
import Image from "next/image";
import Button from "../utils/buttons/Button";

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
    name: "أدوات",
    to: `/tools`,
  },
  {
    icon: TbGitCompare,
    name: "تحليل فني",
    to: `/chart`,
  },
];
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
        <div className="w-full bg-white">
          <motion.header
            className="flex items-center justify-between  md:mx-auto md:w-5/6 w-full  md:px-4 px-2 "
            initial={{ height: "100px" }}
            animate={controls}
          >
            <div className="flex gap-2">
              <Link href="/">
                <div className="hover:cursor-pointer flex justify-center items-center">
                  <Image src="/Logo.png" alt="me" width="180" height="100" />
                </div>
              </Link>

              {routes.map((route, index) => (
                <ActiveMenuLink key={index} href={route.to}>
                  {/* <route.icon /> */}
                  {route.name}
                </ActiveMenuLink>
              ))}
            </div>
            <StocksSearch className={"w-1/3"} />
          </motion.header>
          <header class=" relative shadow-lg px-3 py-2">
            <nav class="flex justify-between">
              <div class="w-[130px] md:w-[200px] flex items-center"></div>
              <div class="flex items-center gap-3">
                <div
                  className={`navLinks duration-500 absolute md:static md:w-auto w-full md:h-auto h-[85vh] bg-white flex md:items-center gap-[1.5vw] top-[100%] left-${
                    menuOpen ? "0%" : "-100%"
                  } px-5 md:py-0 py-5`}
                >
                  {" "}
                  <ul class="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8">
                    <li class="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                      <a href="#">Home</a>
                    </li>
                    <li class="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                      <a href="#">Faculty</a>
                    </li>
                    <li class="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                      <a href="#">Courses</a>
                    </li>
                    <li class="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                      <a href="#">About Us</a>
                    </li>
                    <li class="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                      <a href="#">Contact us</a>
                    </li>
                  </ul>
                </div>
                <div class="flex items-center gap-2">
                  <Button onclick={handleMenuToggle}>xxx</Button>
                </div>
              </div>
            </nav>
          </header>
        </div>
      )}
    </>
  );
};

export default Header;
