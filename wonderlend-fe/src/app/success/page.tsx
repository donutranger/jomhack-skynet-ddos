"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Button from "~/components/button";
import Sidebar from "~/components/sidebar";
import { useFile } from "../provider";
ChartJS.register(...registerables);

const Success = () => {
  const { setFileIds } = useFile();
  const companyFilesString =
    typeof window !== "undefined"
      ? window.localStorage.getItem("organization-files")
      : null;
  const companyFiles = companyFilesString
    ? JSON.parse(companyFilesString)
    : null;
  const { data, error, isLoading } = useQuery({
    queryKey: [
      "risk-report",
      companyFiles?.businessOverviewId,
      companyFiles?.financialStatementsId,
      companyFiles?.complianceId,
      companyFiles?.capitalBreakdownId,
    ],
    queryFn: () => {
      return fetch(`${window.api_endpoint}/risk/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business_overview_id: companyFiles?.businessOverviewId,
          financial_statements_id: companyFiles?.financialStatementsId,
          compliance_id: companyFiles?.complianceId,
          capital_id: companyFiles?.capitalBreakdownId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.error) throw new Error(data.error);
          return data;
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
  });

  useEffect(
    () =>
      data?.result?.risk_rating?.risk_rating
        ? setFileIds((prev) => ({
            ...prev,
            creditScore: data?.result?.risk_rating.risk_rating,
          }))
        : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.result?.risk_rating?.risk_rating]
  );

  useEffect(() => {
    if (data?.result) {
      const companyInfoString =
        typeof window !== undefined
          ? window.localStorage.getItem("organization-info")
          : null;
      const companyInfo = companyInfoString
        ? JSON.parse(companyInfoString)
        : null;
      localStorage.setItem(
        "organization-info",
        JSON.stringify({ ...companyInfo, ...data.result })
      );
    }
  }, [data?.result]);

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
            data?.result &&
            Object.values(
              // @ts-expect-error
              data.result ? Object.values(data.result)[0] : {}
            ).filter((_, i) => i % 2 === 0),
        },
      ],
    }),
    [data?.result]
  );

  if (isLoading)
    return (
      <div className="h-[95vh] font-bold flex items-center justify-center relative">
        <Sidebar />
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="h-[95vh] font-bold flex items-center justify-center relative">
        <Sidebar />
        Error
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
                {data?.result.risk_rating?.risk_rating}%
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
