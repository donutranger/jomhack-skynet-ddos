"use client";
import { Chart as ChartJS, registerables } from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import useCompanyInfo from "../../hooks/useCompanyInfo";
ChartJS.register(...registerables);

const ARRData = () => {
  const { getCompanyData } = useCompanyInfo();
  const data = getCompanyData();

  const graphData = useMemo(
    () => ({
      // @ts-expect-error
      labels: data?.revenue?.map((rev) => rev.month),
      datasets: [
        {
          label: "Annual Recurring Revenue",
          // @ts-expect-error
          data: data?.revenue?.map((rev) => rev.revenue),
          backgroundColor: ["#1E6FF2"],
        },
      ],
      borderWidth: 1,
    }),
    [data?.revenue]
  );

  if (!data?.revenue) return null;

  return (
    <Bar data={graphData} options={{ scales: { y: { beginAtZero: true } } }} />
  );
};

export default ARRData;
