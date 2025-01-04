import React, { useState } from "react";
import InputBox from "../components/InputBox";
import { motion } from "framer-motion";
import { User, Lock } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const LogInPage = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const handleSubmit = () => {};
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl shadow-xl overflow-hidden rounded-xl"
    >
      <div className="mb-2 py-4 px-8">
        <h1 className="py-4 mb-2 font-bold bg-gradient-to-r text-3xl from-green-500 to-emerald-500 text-transparent bg-clip-text flex items-center justify-center">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit}>
          <InputBox
            type="email"
            value={data.email}
            icon={User}
            placeholder="Email"
            onChange={(e) => {
              let prevData = { ...data };
              prevData.email = e.target.value;
              setData(prevData);
            }}
          />
          <InputBox
            type="password"
            value={data.password}
            placeholder="Password"
            icon={Lock}
            onChange={(e) => {
              let prevData = { ...data };
              prevData.password = e.target.value;
              setData(prevData);
            }}
          />
          <div className="text-green-500 text-s mb-4"> Forgot Password ?</div>
          <Button type="submit">Log In</Button>
        </form>
      </div>
      <div className="bg-gray-800 opacity-50 px-8 py-4">
        <span className="flex items-center gap-1 justify-center text-white">
          {`Don't have an account? `}
          <Link to="/signup" className="hover:underline text-green-500 ">
            {" Sign up"}
          </Link>
        </span>
      </div>
    </motion.div>
  );
};

export default LogInPage;
