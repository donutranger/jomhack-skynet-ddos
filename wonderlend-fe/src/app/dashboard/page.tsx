"use client";
import React from "react";
import Sidebar from "~/components/sidebar";
import Image from "next/image";
import Table from "./components/Table";

const Dashboard = () => {
  return (
    <div className="w-full min-h-[94vh] h-max flex flex-col gap-4 bg-white pl-20 pr-6 pt-6 pb-15 relative">
      <Sidebar />
      <div className="flex justify-between flex-wrap flex-col gap-6">
        <h2 className="text-2xl font-bold">Recently Applied</h2>
        <div className="flex justify-between">
          <div className="flex gap-4 border border-gray-400 rounded-md p-2 text-sm w-80">
            <Image src="/search.svg" alt="Search icon" width={16} height={16} />
            <input
              type="text"
              placeholder="Search applicants"
              className="w-72 outline-none"
            />
          </div>
          <div className="flex gap-2 border border-gray-400 rounded-md p-2 text-sm">
            <Image src="/filter.svg" alt="Search icon" width={16} height={16} />
            <p>Filter</p>
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default Dashboard;
