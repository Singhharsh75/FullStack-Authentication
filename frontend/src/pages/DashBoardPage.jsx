import React from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { useStore } from "../store/auth.store";

const DashBoardPage = () => {
  const { logout, user } = useStore();
  const makeDate = (dateVal) => {
    let date = new Date(dateVal);
    if (isNaN(date)) {
      return "Invalid Date!";
    }
    date = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return date;
  };
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
        <div className="p-2 rounded-lg bg-gray-800 bg-opacity-80 flex flex-col gap-2 border border-slate-500">
          <h1 className="text-xl text-green-500 mb-2 font-semibold">
            User Info:
          </h1>
          <span className="text-slate-300">
            {"Name: "}
            {user.name}
          </span>
          <span className="text-slate-300">
            {"Email Address: "}
            {user.email}
          </span>
        </div>
        <div className="p-2 mt-2 mb-4 rounded-lg bg-gray-800 bg-opacity-80 flex flex-col gap-2 border border-slate-500">
          <h1 className="text-xl text-green-500 mb-2 font-semibold">
            Login Info:
          </h1>
          <span className="text-slate-300">
            {"Joined in: "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="text-slate-300">
            {"Last logged in at: "}
            {makeDate(user.lastLogin)}
          </span>
        </div>
        <Button onClick={handleClick}>Log out</Button>
      </div>
    </motion.div>
  );
};

export default DashBoardPage;
