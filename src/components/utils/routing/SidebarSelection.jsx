import React from "react";
import Link from "next/link";
import { Card } from "../cards/Card";
import { usePathname } from "next/navigation";

const ActiveMenuLink = ({ children, href }) => {
  const pathname = usePathname();
  const active = href === pathname;
  return (
    <Link
      href={href}
      className={`flex justify-self-center items-center text-lg text-primary  gap-2 hover:bg-gray-100 p-2 rounded  ${
        active ? "text-black font-semibold bg-slate-400" : "text-gray-500"
      }`}
      //   className=""
    >
      {children}
    </Link>
  );
};

export const SidebarSelection = ({ routes }) => {
  return (
    <Card>
      <div className="">
        {routes.map((route, index) => (
          <ActiveMenuLink
            href={route.to} // Using the 'to' property from the route object
          >
            <route.icon />
            {route.name}
          </ActiveMenuLink>
        ))}
      </div>
    </Card>
  );
};
