import React from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { useStore } from "../store/auth.store";

const DashBoardPage = () => {
  const { logout } = useStore();
  const handleClick = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 rounded-xl shadow-xl backdrop-filter backdrop-blur-xl "
    >
      <div className="py-4 px-8">
        <h1 className="text-3xl bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text flex item-center justify-center mb-2">
          Dashboard Page
        </h1>
        <></>
      </div>
    </motion.div>
  );
};

export default DashBoardPage;
