"use client";
import Sidebar from "./Sidebar";
import { TbHome, TbTable, TbGitCompare } from "react-icons/tb";
import { MdBalance } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaListUl } from "react-icons/fa6";
import { GoGear } from "react-icons/go";
import Header from "./Header";

function SidebarLayout({ children }) {
  const routesList = [
    {
      icon: TbHome,
      name: "الرئيسية",
      href: `/`,
    },
    {
      icon: FaListUl,
      name: "السوق",
      href: `/stocks`,
    },
    {
      icon: MdBalance,
      name: "قارن",
      href: `/comparison`,
    },
    {
      icon: GoGear,
      name: "أدوات",
      href: `/tools`,
    },
    {
      icon: AiOutlineFundProjectionScreen,
      name: "تحليل فني",
      href: `/chart`,
    },
    {
      icon: TbGitCompare,
      name: "test",
      href: `/test`,
      subRoutes: [
        { name: "1", icon: TbGitCompare, href: `/` },
        { name: "2", icon: TbGitCompare, href: `/` },
        { name: "3", icon: TbGitCompare, href: `/` },
      ],
    },
  ];
  return (
    <div className="flex md:flex-row flex-col">
      <Sidebar routes={routesList} />
      <div className="w-full">
        <Header />

        <main className=" w-full ">{children}</main>
      </div>
    </div>
  );
}

export default SidebarLayout;
