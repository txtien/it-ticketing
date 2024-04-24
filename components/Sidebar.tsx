"use client";

import React from "react";
import {
  LayoutDashboard,
  Ticket,
  Settings,
  CirclePlus,
  Building,
  TicketIcon,
  Boxes,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const menus = [
  {
    id: 1,
    name: "Dashboard",
    icon: <LayoutDashboard />,
    children: null,
    url: "/",
  },
  { id: 2, name: "Tickets", icon: <Ticket />, children: null, url: "/tickets" },
  {
    id: 3,
    name: "Settings",
    icon: <Settings />,
    children: [
      {
        id: 4,
        name: "Department",
        icon: <Building />,
        url: "/settings/department",
      },
      {
        id: 5,
        name: "Ticket Type",
        icon: <TicketIcon />,
        url: "/settings/ticket-type",
      },
      { id: 6, name: "Category", icon: <Boxes />, url: "/settings/category" },
    ],
  },
];

const Sidebar = () => {
  const [showChildren, setShowChildren] = React.useState(false);
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className="w-80 min-h-screen overflow-auto bg-primary">
      <h1 className="text-center text-white mt-4 font-bold text-2xl">
        Help Ticket
      </h1>
      <div className="w-full flex justify-center items-center">
        <Button asChild variant={"ghost"}>
          <Link
            href="/create-ticket"
            className="bg-white text-black hover:bg-gray-100 flex mx-auto mt-4 w-1/2"
          >
            <CirclePlus className="w-4 h-4 mr-2" /> Create New
          </Link>
        </Button>
      </div>
      <ul className="px-8 flex flex-col gap-4 pt-16">
        {menus.map((menu) => {
          return (
            <React.Fragment key={menu.id}>
              <li
                className={cn(
                  "flex gap-2 items-center text-white cursor-pointer hover:bg-blue-300 py-2 px-4 rounded-sm",
                  {
                    "bg-blue-200": pathName === menu.url,
                  }
                )}
                onClick={() => {
                  if (menu.children) {
                    setShowChildren(!showChildren);
                  } else {
                    router.push(menu.url);
                  }
                }}
              >
                {menu.icon}
                <span>{menu.name}</span>
              </li>
              {menu.children && menu.children.length > 0 && showChildren && (
                <ul className="flex flex-col gap-2 pl-8">
                  {menu.children.map((child) => {
                    return (
                      <Link
                        key={child.id}
                        href={child.url}
                        className={cn(
                          "flex gap-2 items-center text-white cursor-pointer hover:bg-blue-300 py-2 px-4 rounded-sm",
                          {
                            "bg-blue-200": pathName === child.url,
                          }
                        )}
                      >
                        {child.icon}
                        <span>{child.name}</span>
                      </Link>
                    );
                  })}
                </ul>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
