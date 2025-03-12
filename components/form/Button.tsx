import classNames from "classnames";
import { forwardRef } from "react";
import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ children, className, disabled = false, ...restProps }, ref) => (
  <button
    ref={ref}
    className={classNames(
      disabled
        ? "bg-[#A09DFF] cursor-not-allowed text-white min-w-[138px] h-[59px] px-[40px] py-[18px] text-center rounded-[10px] w-full"
        : "cursor-pointer rounded-[10px] text-white bg-primary min-w-[138px] h-[59px] px-[40px] py-[18px] text-center w-full",
      className,
    )}
    disabled={disabled}
    {...restProps}
  >
    {children}
  </button>
));

Button.displayName = "Button";

export default Button;
