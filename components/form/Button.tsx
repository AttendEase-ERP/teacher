"use client";

import classNames from "classnames";

import React from "react";

interface CustomButtonProps {
  overrideStyles?: boolean;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  CustomButtonProps;

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled = false,
  overrideStyles = false,
  ...restProps
}) => {
  const computedClassName = overrideStyles
    ? classNames(className)
    : classNames(
        "rounded-[10px] text-white min-w-[138px] h-[59px] px-[40px] py-[18px] text-center w-full cursor-pointer",
        disabled
          ? "bg-[#A09DFF] cursor-not-allowed"
          : "cursor-pointer bg-primary",
        className,
      );

  return (
    <button className={computedClassName} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
