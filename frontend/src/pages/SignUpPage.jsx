import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InputBox from "../components/InputBox";
import { Loader, Lock, Mail, User } from "lucide-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrength from "../components/PasswordStrength";
import { useStore } from "../store/auth.store";

const SignUpPage = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { signup, error, isLoading } = useStore();

  const submitFunc = async (e) => {
    e.preventDefault();
    try {
      await signup({ ...data });
      navigate("/email-verify");
    } catch (error) {
      console.log(error.message);
    }
  };

  //   useEffect(() => {
  //     console.log("data", data);
  //   }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className=" max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="px-8 pt-8">
        <h1 className="text-3xl font-bold mb-6 text-transparent text-center bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500 ">
          Create an account
        </h1>
        <form onSubmit={submitFunc}>
          <InputBox
            value={data.name}
            type="text"
            onChange={(e) => {
              const prevData = { ...data };
              prevData.name = e.target.value;
              setData(prevData);
            }}
            placeholder="Username"
            icon={User}
          />
          <InputBox
            value={data.email}
            type="email"
            onChange={(e) => {
              const prevData = { ...data };
              prevData.email = e.target.value;
              setData(prevData);
            }}
            placeholder="Email"
            icon={Mail}
          />
          <InputBox
            value={data.password}
            type="password"
            onChange={(e) => {
              const prevData = { ...data };
              prevData.password = e.target.value;
              setData(prevData);
            }}
            placeholder="Password"
            icon={Lock}
          />
          {error ? (
            <p className="text-red-600 flex item-center justify-center mb-2">
              {error}
            </p>
          ) : null}
          <PasswordStrength password={data.password} />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Sign Up"
            )}
          </Button>
          <div className="h-4"></div>
        </form>
      </div>
      <div className="text-white px-8 py-4 text-center opacity-50 bg-gray-800">
        <div className="pt-1">
          {`Already have an account ? `}
          <Link className="text-green-500 hover:underline" to="/login">
            Log In
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
