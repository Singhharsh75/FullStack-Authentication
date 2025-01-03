import React from "react";

const InputBox = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute left-0 pl-3 inset-y-0 flex items-center pointer-events-none">
        <Icon className="size-5 text-green-500 " />
      </div>
      <input
        {...props}
        className="w-full placeholder-gray-400 pl-10 pr-3 py-2 flex justify-center
         bg-gray-800 bg-opacity-50 rounded-lg border border-gray-500
         focus:border-green-500 focus:outline-none focus:ring-2 focus: ring-green-500 text-white transition duration-200"
      />
    </div>
  );
};

export default InputBox;
