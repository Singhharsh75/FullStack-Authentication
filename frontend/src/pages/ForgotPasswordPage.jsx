import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InputBox from "../components/InputBox";
import { Lock } from "lucide-react";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../store/auth.store";

const ForgotPassword = () => {
  const [data, setData] = useState({ password: "", rePassword: "" });
  const [error, setError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const { passReset } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.rePassword) {
      setError("Dissimilar password. Re-enter !!");
    } else {
      setError("");
      setData({ password: "", rePassword: "" });
      try {
        await passReset(data.password, token);
        navigate("/login");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-40 rounded-xl shadow-xl backdrop-filter backdrop-blur-xl"
    >
      <form onSubmit={handleSubmit} className="px-8 py-4">
        <h1 className="text-3xl mb-4 flex item-center justify-center font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text">
          Forgot Password
        </h1>
        <InputBox
          type="password"
          placeholder={"New Password"}
          value={data.password}
          onChange={(e) => {
            let newPass = { ...data };
            newPass.password = e.target.value;
            setData(newPass);
          }}
          icon={Lock}
        />
        <InputBox
          type="password"
          placeholder={"Re-enter Password"}
          value={data.rePassword}
          onChange={(e) => {
            let newPass = { ...data };
            newPass.rePassword = e.target.value;
            setData(newPass);
          }}
          icon={Lock}
        />
        <div className="bg-transparent text-green-600 flex items-center justify-center mb-2">
          {error}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </motion.div>
  );
};

export default ForgotPassword;
