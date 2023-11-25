import { usePathname } from "next/navigation";
import { useMemo } from "react";
import useCompanyInfo from "~/app/hooks/useCompanyInfo";

const CapitalBreakdown = () => {
  const { getCompanyData } = useCompanyInfo();
  const pathname = usePathname();
  const currCompanyName = pathname
    .split("/")[3]
    .split("[A-Z]*")
    .map((word) => word[0].toLocaleUpperCase() + word.slice(1))
    .join(" ");

  const data = getCompanyData();
  const defaultData = [
    { name: "Haris", percentage: 34.6, color: "bg-blue-300" },
    { name: "Cradle", percentage: 30.8, color: "bg-emerald-300" },
    { name: "Kirill", percentage: 22.5, color: "bg-violet-300" },
    { name: "Antler", percentage: 10.8, color: "bg-yellow-400" },
  ];

  const currData = useMemo(() => {
    if (!data?.cap_breakdown) return;

    // @ts-expect-error
    return data.cap_breakdown.map((cp) => ({
      name: cp.investor_name,
      percentage: cp.shares_held_percentage,
      color: [
        "bg-blue-300",
        "bg-emerald-300",
        "bg-violet-300",
        "bg-yellow-400",
      ][Math.round(Math.random() * 3)],
    }));
  }, [data?.cap_breakdown]);

  const capBreakdownData = useMemo(() => {
    if (currCompanyName === data?.company_name.toLowerCase())
      return currData ?? defaultData;
    return defaultData;
  }, []);

  return (
    <div className="flex-1 px-6 py-4 bg-white rounded-lg border shadow-md flex flex-col gap-4">
      <h3 className="text-md font-semibold text-gray-800 mb-2">
        Capital Breakdown
      </h3>
      <div className="flex h-6 overflow-hidden gap-1">
        {
          // @ts-expect-error
          capBreakdownData.map((item, idx) => (
            <div
              key={idx}
              className={`${item.color} flex-1 rounded-md`}
              style={{ flex: `0 0 ${item.percentage}%` }}
            ></div>
          ))
        }
      </div>
      <div className="flex gap-3 text-xs text-gray-600 mt-2">
        {
          // @ts-expect-error
          capBreakdownData.map((item, idx) => (
            <div key={idx}>
              <span className="flex items-center">
                <span
                  className={`h-2 w-2 ${item.color} rounded-full mr-1`}
                ></span>
                {item.name}&nbsp;{item.percentage}%
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default CapitalBreakdown;
