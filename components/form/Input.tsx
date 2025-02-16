import classNames from "classnames";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  (
    {
      className,
      type = "text",
      name,
      placeholder,
      disabled = false,
      ...restProps
    },
    ref,
  ) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className={classNames(
          "bg-[#222131] w-[300px] h-[53px] text-white rounded-[10px] placeholder-[#6E7191] px-[32px] py-[16px] border-4 outline-none shadow-sm transition-all duration-200 border-black focus:border-primary",
          className,
        )}
        ref={ref}
        {...restProps}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
