import React from "react";

type Props = {};

const Button = (props: Props) => {
  return (
    <button className="bg-blue-600 disabled:bg-slate-200 p-2 h-8 flex jutify-center items-center text-white disabled:text-gray-600 font-bold text-center rounded-lg">
      Test
    </button>
  );
};

export default Button;
