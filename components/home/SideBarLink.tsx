"use client";

import * as React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

import classNames from "classnames";

import NextImage from "../Image";

interface SideBarLinkProps {
  href: string;
  label: string;
  icon: string;
  classnames?: string;
}

const SideBarLink: React.FC<SideBarLinkProps> = ({
  href,
  label,
  icon,
  classnames,
  ...restProps
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={classNames(
        "flex items-center gap-3 px-4 py-2 transition-colors duration-200",
        isActive
          ? "text-primary font-medium"
          : "text-gray-400 hover:text-gray-600",
        classnames,
      )}
      {...restProps}
    >
      <NextImage src={icon} alt={`${label} icon`} width={20} height={20} />
      <span>{label}</span>
    </Link>
  );
};

export default SideBarLink;
