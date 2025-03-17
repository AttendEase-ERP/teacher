import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import * as React from "react";
interface ExtendedLinkProps extends LinkProps {
  className?: string;
  underline?: boolean;
  children: React.ReactNode;
}

const NextLink: React.FC<ExtendedLinkProps> = ({
  children,
  className,
  href,
  underline = false,
  ...restProps
}) => {
  return (
    <Link
      href={href}
      className={classNames(
        "inline-flex items-center justify-center cursor-pointer rounded-[10px] text-primary font-bold",
        className,
        underline ? "hover:underline" : "",
      )}
      {...restProps}
    >
      {children}
    </Link>
  );
};

export default NextLink;
