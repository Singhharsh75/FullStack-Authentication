import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const navigate = useNavigate();
  const ref = useRef([]);

  const handleClick = () => {
    console.log("ji");
  };

  const handleButtonClick = (index, e) => {
    const value = e.target.value;
    const newCode = [...code];
    if (value.length > 1) {
      const pastedCode = value.slice(0, 5).split("");
      for (let i = 0; i < 5; i++) {
        newCode[i] = pastedCode[i];
      }
      setCode(newCode);
      const lastIndex = newCode.findLastIndex((digit) => digit !== "");
      lastIndex < 4
        ? ref.current[lastIndex + 1].focus()
        : ref.current[4].focus();
    } else {
      newCode[index] = value;
      index < 4 ? ref.current[index + 1].focus() : ref.current[4].focus();
      setCode(newCode);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      ref.current[index - 1].focus();
    }
  };

  useEffect(() => {
    ref.current[0].focus();
  }, []);
  useEffect(() => {
    console.log(code);
    console.log(code.join(""));
  }, [code]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-xl shadow-xl overflow-hidden"
    >
      <div className="my-4 mx-8 flex flex-col gap-1">
        <h1 className="text-3xl mb-4 bg-gradient-to-r text-transparent font-bold flex justify-center from-green-500 to-emerald-500 bg-clip-text">
          Verify Your Email
        </h1>
        <span className="text-xs text-white flex justify-center items-center mx-4 my-2">
          {" "}
          Enter the 5-digit code sent to your email address
        </span>
        <div className="my-4 flex gap-5">
          {code.map((item, index) => (
            <input
              key={index}
              ref={(el) => (ref.current[index] = el)}
              maxLength={6}
              value={item}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onChange={(e) => {
                handleButtonClick(index, e);
              }}
              className="h-14 w-1/4 bg-gray-800 bg-opacity-60 rounded-xl
                text-white text-center
               py-2 px-1 focus:outline-none 
              focus: border-green-500 focus:ring-2 focus:ring-green-800"
            />
          ))}
        </div>
        <Button disabled={code.join("").length < 5} onClick={handleClick}>
          Submit
        </Button>
      </div>
    </motion.div>
  );
};

export default EmailVerification;
