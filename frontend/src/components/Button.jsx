import React from "react";

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 p-2 rounded-lg text-center font-bold text-white "
    >
      {children}
    </button>
  );
};

export default Button;
