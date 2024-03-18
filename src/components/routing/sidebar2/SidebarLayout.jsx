"use client";
import Sidebar from "./Sidebar";

function SidebarLayout({ children }) {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <main className=" w-full  ">{children}</main>
    </div>
  );
}

export default SidebarLayout;
