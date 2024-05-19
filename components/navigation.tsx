"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import NavButton from "./nav-button";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  // {
  //   href: "/settings",
  //   label: "Settings",
  // },
];

type RouteType = {
  href: string;
  label: string;
};

const Navigation = () => {
  const isMobile = useMedia("(max-width: 1024px)", false);
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant={"outline"}
            size={"sm"}
            className={`font-normal bg-transparent hover:bg-white/20 
                hover:text-white border-none
                focus-visible:ring-offset-0 focus-visible:ring-transparent 
                outline-none text-white focus:bg-white/30`}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.length > 0 &&
              routes.map((route: RouteType, index) => (
                <Button
                  key={route.href}
                  variant={route.href == pathName ? "secondary" : "ghost"}
                  onClick={() => onClick(route.href)}
                  className="w-full justify-start"
                >
                  {route.label}
                </Button>
              ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className=" hidden lg:flex items-center gap-2 overflow-auto">
      {routes.length > 0 &&
        routes.map((route: RouteType, index) => {
          if (route.label && route.href) {
            return (
              <NavButton
                key={route.href}
                href={route.href}
                label={route.label}
                isActive={pathName == route.href}
              />
            );
          }
          return null;
        })}
    </nav>
  );
};

export default Navigation;
