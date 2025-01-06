import React, { useState } from "react";
import { motion } from "framer-motion";
import InputBox from "../components/InputBox";
import { User } from "lucide-react";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { useStore } from "../store/auth.store";

const ForgotPasswordReq = () => {
  const [email, setEmail] = useState("");
  const { passReq } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await passReq({ email });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full rounded-xl shadow-xl overflow-hidden bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-xl"
    >
      <form onSubmit={handleSubmit} className="px-8 py-4">
        <h1 className="text-3xl flex items-center justify-center font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text mb-4">
          Re-enter Email{" "}
        </h1>
        <InputBox
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Email"
          icon={User}
        />
        <Button type="submit">Submit</Button>
      </form>
    </motion.div>
  );
};

export default ForgotPasswordReq;
