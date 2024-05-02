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
  MenuIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import "./Sidebar.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const menus = [
  {
    id: 1,
    name: "Tickets",
    icon: <LayoutDashboard />,
    children: null,
    url: "/",
  },
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
    <div className="h-screen w-20 fixed sm:relative z-10 sm:w-64 overflow-auto bg-primary sidebar">
      <div className="heading flex mt-4 items-center gap-2 pl-8">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={60}
          height={60}
          className="h-8 w-auto"
        />
        <h1 className="hidden sm:block flex-1 text-white font-bold text-lg m-0">
          Ticketing
        </h1>
      </div>
      <div className="w-full mt-4 px-8 hidden sm:flex justify-center items-center">
        <Button asChild variant={"ghost"}>
          <Link
            href="/create-ticket"
            className="bg-white text-black hover:bg-gray-100 flex justify-center mt-4 gap-2 w-fit"
          >
            <CirclePlus size={16} /> Create New
          </Link>
        </Button>
      </div>
      <span className="w-full flex justify-center mt-4">
        <MenuIcon className="block sm:hidden" color="#fff" />
      </span>
      <ul className="sm:px-4 flex flex-col gap-4 pt-8">
        {menus.map((menu) => {
          return (
            <React.Fragment key={menu.id}>
              <li
                className={cn(
                  "flex flex-col sm:flex-row gap-2 justify-center sm:justify-start sm:pl-4 items-center text-white cursor-pointer py-2 rounded-sm item-menu",
                  {
                    active: pathName === menu.url,
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
                <span className="icon">{menu.icon}</span>
                <span className="text-xs sm:text-base">{menu.name}</span>
              </li>
              {menu.children && menu.children.length > 0 && showChildren && (
                <ul className="flex flex-col gap-2 sm:pl-4 w-full">
                  {menu.children.map((child) => {
                    return (
                      <li key={child.id}>
                        <Link
                          href={child.url}
                          className={cn(
                            "flex flex-col sm:flex-row gap-2 items-center text-white cursor-pointer py-2 sm:px-4 sm:justify-start rounded-sm item-menu --child",
                            {
                              active: pathName === child.url,
                            }
                          )}
                        >
                          {child.icon}
                          <span className="text-xs sm:text-base">
                            {child.name}
                          </span>
                        </Link>
                      </li>
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
