"use client";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import Button from "~/components/button";
import Sidebar from "~/components/sidebar";
ChartJS.register(...registerables);

const Success = () => {
  const { mutate, data } = useMutation({
    mutationFn: () => {
      return fetch(`${window.api_endpoint}/risk/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business_overview_id:
            "47c3837481bf504d62d0cd3c7e9a8bd1bccf63b4cf134cdc0ba05a5b12a6869e",
          financial_statements_id:
            "6627c64e3468193b38a7bb6e7f9a14e01ca18769c88325d86337f2392f0197d7",
          compliance_id:
            "58b1d84a744937458effd1115a1dd1f3b6d9b8f3f7c4c5cf3b67c64e4324a925",
        }),
      })
        .then((res) => res.json())
        .then((data) => data?.result);
    },
  });

  useEffect(() => mutate(), [mutate]);

  const chartData = useMemo(
    () => ({
      labels: [
        "Market position rating",
        "Competitive analysis rating",
        "Industry market analysis",
      ],
      datasets: [
        {
          data:
            data &&
            // @ts-expect-error
            Object.values(data ? Object.values(data)[0] : {}).filter(
              (_, i) => i % 2 === 0
            ),
        },
      ],
    }),
    [data]
  );

  if (!data)
    return (
      <div className="h-[95vh] font-bold flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="w-full h-max flex p-4 pl-16 flex-col gap-4 relative">
      <Sidebar />
      <div className="flex justify-between gap-4 flex-wrap">
        <div className="flex gap-2 w-full h-full">
          <div className="bg-white p-4 rounded-xl shadow-md w-1/2">
            <p className="font-bold pb-2 text-lg">Risk Rating</p>
            <div className="w-full h-3/4 flex flex-col gap-12 justify-center items-center">
              <p className="text-4xl font-bold">
                {data.risk_rating?.risk_rating}%
              </p>
              <Button text="Re-evaluate" className="w-64" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md w-1/2">
            <p className="font-bold pb-2 text-lg">Business Overview</p>
            <div className="w-full flex justify-center h-64 ">
              <Doughnut
                data={chartData}
                redraw
                options={{
                  plugins: { legend: { display: true, fullSize: true } },
                }}
              />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md w-full h-[55vh] relative">
          <p className="font-bold pb-2 text-lg">Financial PLanner</p>
          <p className="flex w-[90vw] h-[40vh] items-center justify-center absolute bg-white bg-opacity-50">
            Unlock Financial Planning by getting approved from Investors
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
