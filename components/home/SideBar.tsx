"use client";

import { SideBarLinks } from "@/constants";

import SideBarLink from "./SideBarLink";

import NextImage from "../Image";

const SideBar = () => {
  return (
    <div className="flex flex-col items-start justify-start w-[25%] h-screen p-4 bg-neutral border-r">
      <div className="items-center justify-center w-full h-[10%] flex flex-col mt-6 text-primary font-bold text-[22px]">
        <NextImage
          src="/logo.svg"
          alt=""
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
  );
};

export default SideBar;
