"use client";
import React from "react";
import Sidebar from "~/components/sidebar";

const Applicant = () => {
    return (
        <div className="w-full min-h-[94vh] h-max flex p-4 pl-16 flex-col gap-4 relative">
            <div className="h-full w-full min-h-screen flex flex-col items-center bg-white">

                <Sidebar />
                <div className="flex justify-between gap-4 flex-wrap"></div>
            </div>
        </div>
    );
};

export default Applicant;
