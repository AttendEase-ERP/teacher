import classNames from "classnames";
import Link from "next/link";
import { forwardRef } from "react";
import * as React from "react";

type LinkProps = React.ComponentProps<typeof Link>;

const Customlink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, href, ...restProps }, ref) => (
    <Link
      ref={ref}
      href={href}
      className={classNames(
        "inline-flex items-center justify-center cursor-pointer rounded-[10px] text-[#605CFF] font-bold",
        className,
      )}
      {...restProps}
    >
      {children}
    </Link>
  ),
);

Customlink.displayName = "Link";

export default Customlink;
