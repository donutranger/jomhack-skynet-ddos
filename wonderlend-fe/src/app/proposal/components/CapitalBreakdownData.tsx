"use client";
import React, { useMemo } from "react";
import useCompanyInfo from "../../hooks/useCompanyInfo";
import { Chart as ChartJS, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(...registerables);

const CapitalBreakdownData = () => {
  const { getCompanyData } = useCompanyInfo();
  const data = getCompanyData();

  const graphData = useMemo(
    () => ({
      // @ts-expect-error
      labels: data?.cap_breakdown?.map((ct) => ct.investor_name),
      datasets: [
        {
          label: "Annual Recurring Revenue",
          // @ts-expect-error
          data: data?.cap_breakdown?.map((ct) => ct.shares_held_percentage),
          backgroundColor: [
            "#B9A9FF",
            "#63F2B2",
            "#76D6FF",
            "#FFCE46",
            "pink",
            "#ddd",
          ],
        },
      ],
      borderWidth: 1,
    }),
    [data?.cap_breakdown]
  );

  if (!data?.cap_breakdown) return null;

  return (
    <div className="h-96 w-full pt-3 flex justify-center">
      <Doughnut data={graphData} />
    </div>
  );
};

export default CapitalBreakdownData;
