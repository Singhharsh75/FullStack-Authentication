import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InputBox from "../components/InputBox";
import { Mail, MoveLeft, User } from "lucide-react";
import Button from "../components/Button";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../store/auth.store";

const ForgotPasswordReq = () => {
  const [email, setEmail] = useState("");
  const { passReq } = useStore();
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await passReq({ email });
      setEmailSent((prev) => !prev);
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
      <h1 className="text-3xl mt-4 flex items-center justify-center font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text mb-4">
        Forgot Password{" "}
      </h1>
      {emailSent ? (
        <div className="p-8 pt-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-16 h-16 bg-green-500 flex items-center justify-center rounded-full mx-auto mb-4"
          >
            <Mail className="h-8 w-8" />
          </motion.div>
          <p className="text-slate-200">{`If an account exists for ${email}, you will receive a password reset link shortly.`}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8">
          <p className="text-gray-300 text-center mb-2">
            {"Enter your email address and we'll send you a reset link."}
          </p>
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
      )}
      <div className="py-4 px-8 bg-gray-800 opacity-80 text-green-500 flex items-center justify-center">
        <Link to="/login" className="flex">
          <MoveLeft size={16} className="mt-1 mr-2" />
          <span>Back to login</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordReq;
