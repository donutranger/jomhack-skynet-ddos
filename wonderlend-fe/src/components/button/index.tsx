import React, { ComponentProps } from "react";

type TProps = {
  disabled?: boolean;
  className?: string;
  text: string;
  onClick?: ComponentProps<"button">["onClick"];
  variant?: "neutral" | "primary";
};

const Button = ({
  disabled,
  className,
  text,
  onClick,
  variant = "primary",
}: TProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`justify-center ${
        variant === "primary"
          ? "bg-blue-600 text-white"
          : "bg-slate-300 text-gray-600"
      } hover:${
        variant === "primary" ? "bg-blue-800" : "bg-slate-500"
      } disabled:bg-slate-200 hover:disabled:cursor-not-allowed hover:cursor-pointer p-2 h-8 flex items-center  disabled:text-gray-300 font-bold text-center rounded-lg ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
