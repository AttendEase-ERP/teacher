"use client";

import { SideBarLinks } from "@/constants";

import SideBarLink from "./SideBarLink";
import NextImage from "../Image";
import Button from "../form/Button";

import { signOut } from "@/lib/auth/auth";

const SideBar = () => {
  return (
    <div className="flex flex-col justify-between w-[25%] h-screen p-4 bg-neutral border-r">
      <div>
        <div className="items-center justify-center w-full h-[10%] flex flex-col mt-6 text-primary font-bold text-[22px]">
          <NextImage
            src="/logo.svg"
            alt="AttendEase logo"
            width={60}
            height={60}
            className="mb-4"
          />
          <h1>AttendEase</h1>
        </div>

        <nav className="flex flex-col gap-2 mt-10">
          {Object.entries(SideBarLinks).map(([label, iconPath]) => (
            <SideBarLink
              key={label}
              href={label !== "Dashboard" ? `/${label.toLowerCase()}` : "/"}
              label={label}
              icon={iconPath}
            />
          ))}
        </nav>
      </div>

      <Button
        onClick={signOut}
        className="text-left mt-6 text-sm font-medium text-red-600 bg-red-100 rounded transition-colors duration-200"
      >
        Sign out
      </Button>
    </div>
  );
};

export default SideBar;
