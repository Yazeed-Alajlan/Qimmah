"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { TbHome, TbTable, TbGitCompare } from "react-icons/tb";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const pathname = usePathname();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const routesList = [
    {
      icon: TbHome,
      name: "الرئيسية",
      href: `/`,
    },
    {
      icon: TbTable,
      name: "السوق",
      href: `/stocks`,
    },
    {
      icon: TbGitCompare,
      name: "قارن",
      href: `/comparison`,
    },
    {
      icon: TbGitCompare,
      name: "أدوات",
      href: `/tools`,
      subRoutes: [
        { name: "dashboard", icon: TbGitCompare, href: `/tools/dashboard` },
        { name: "realtime", icon: TbGitCompare, href: `/tools/realtime` },
        { name: "events", icon: TbGitCompare, href: `/tools/events` },
      ],
    },
    {
      icon: TbGitCompare,
      name: "تحليل فني",
      href: `/chart`,
      subRoutes: [
        { name: "t1", icon: TbGitCompare, href: `/chart/t1` },
        { name: "t2", icon: TbGitCompare, href: `/chart/t2` },
      ],
    },
    // {
    //   name: "build",
    //   icon: RiBuilding3Line,
    //   menus: ["auth", "app settings", "stroage", "hosting"],
    // },
    // {
    //   name: "analytics",
    //   icon: TbReportAnalytics,
    //   menus: ["dashboard", "realtime", "events"],
    // },
  ];

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative sticky
         h-screen "
      >
        <div className="flex flex-col  gap-2 font-medium border-b py-3 border-slate-300  mx-3">
          {/* Logo */}
          <Link href="/">
            <Image
              className="hover:cursor-pointer"
              src="/Logo.png"
              alt="me"
              width="180"
              height="100"
            />
          </Link>
          {/* Title */}
          <span className="text-xl whitespace-pre">Qimmah</span>
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            {/* {(open || isTabletMid) && (
              <div className="border-y py-5 border-slate-300 ">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Product categories
                </small>
                {routesList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )} */}
            {routesList.map((route) => (
              <div key={route.name} className="flex flex-col gap-1">
                {route.subRoutes ? (
                  <>
                    <SubMenu data={route} />
                  </>
                ) : (
                  <>
                    <Link href={route.href} className="flex  gap-4 text-2xl">
                      <route.icon />
                      {route.name}
                    </Link>
                  </>
                )}
                {console.log(route)}
              </div>
            ))}
            <li>
              <Link href={"/settings"} className="link">
                <SlSettings size={23} className="min-w-max" />
                Settings
              </Link>
            </li>
          </ul>

          {/* footer */}
          {open && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          )}
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
