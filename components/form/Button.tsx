"use client";

import classNames from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled = false,
  ...restProps
}) => {
  return (
    <button
      className={classNames(
        "rounded-[10px] text-white min-w-[138px] h-[59px] px-[40px] py-[18px] text-center w-full",
        disabled
          ? "bg-[#A09DFF] cursor-not-allowed"
          : "cursor-pointer bg-primary",
        className,
      )}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
