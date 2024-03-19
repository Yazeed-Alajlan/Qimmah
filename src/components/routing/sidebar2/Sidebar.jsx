"use client";
import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { MdMenu } from "react-icons/md";

const Sidebar = ({ routes }) => {
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

  return (
    <div className="md:sticky fixed top-0 z-10  h-full">
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
            overflow-hidden md:relative fixed h-screen "
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
          {/* {open && <span className="text-xl whitespace-pre">Qimmah</span>} */}
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            {/* <div className="border-y py-5 border-slate-300 " /> */}
            {routes?.map((route) => (
              <div key={route.name} className="flex flex-col gap-1 text-2xl">
                {route.subRoutes ? (
                  <div
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <SubMenu data={route} />
                  </div>
                ) : (
                  <div>
                    <Link
                      href={route.href}
                      className={`link hover:bg-gray-100 ${
                        route.href === "/"
                          ? pathname === route.href
                            ? "bg-gray-200 text-primary"
                            : ""
                          : pathname.includes(route.href) &&
                            "bg-gray-200 text-primary"
                      }`}
                    >
                      <route.icon size={23} className="min-w-max" />
                      <p className="flex-1 capitalize">{route.name}</p>
                    </Link>
                  </div>
                )}
                {console.log(route)}
              </div>
            ))}
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
          className="absolute w-fit h-fit block z-50  right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div
        className="m-1 p-2 md:hidden bg-white w-fit rounded-full flex items-center justify-center"
        onClick={() => setOpen(true)}
      >
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
