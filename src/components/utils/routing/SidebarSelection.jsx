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
      className={`link-line-indicator flex justify-self-center items-center text-lg text-primary  gap-2 hover:bg-gray-300 p-2 rounded  ${
        active ? " font-semibold bg-gray-200 " : ""
      }`}
    >
      {children}
    </Link>
  );
};

export const SidebarSelection = ({ routes }) => {
  return (
    <Card>
      <div>
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
