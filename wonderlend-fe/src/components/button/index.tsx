import React from "react";

type TProps = {
  disabled?: boolean;
  text: string;
};

const Button = (props: TProps) => {
  return (
    <button
      disabled={props.disabled}
      className="bg-blue-600 disabled:bg-slate-200 p-2 h-8 flex jutify-center items-center text-white disabled:text-gray-600 font-bold text-center rounded-lg"
    >
      {props.text}
    </button>
  );
};

export default Button;
