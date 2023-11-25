"use client";
import React from "react";
import Sidebar from "~/components/sidebar";

const Dashboard = () => {
  return (
    <div className="w-full min-h-[94vh] h-max flex p-4 pl-16 flex-col gap-4 relative">
      <Sidebar />
      <div className="flex justify-between gap-4 flex-wrap"></div>
    </div>
  );
};

export default Dashboard;
