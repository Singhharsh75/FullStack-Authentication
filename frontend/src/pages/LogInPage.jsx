import React, { useState } from "react";
import InputBox from "../components/InputBox";
import { motion } from "framer-motion";
import { User, Lock, Loader } from "lucide-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/auth.store";

const LogInPage = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { login, error, isLoading } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ ...data });
    navigate("/");
  };
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
          <div className="text-green-500 text-s mb-4 cursor-pointer">
            <Link to="/forgot-password-req">Forgot Password ?</Link>
          </div>
          {error ? (
            <p className="text-red-600 flex item-center justify-center mb-2">
              {error}
            </p>
          ) : null}
          <Button type="submit">
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Log In"
            )}
          </Button>
        </form>
      </div>
      <div className="bg-gray-800 opacity-50 px-8 py-4">
        <span className="flex items-center gap-1 justify-center text-white">
          {`Don't have an account? `}
          <Link
            to="/signup"
            className="cursor-pointer hover:underline text-green-500 "
          >
            {" Sign up"}
          </Link>
        </span>
      </div>
    </motion.div>
  );
};

export default LogInPage;
