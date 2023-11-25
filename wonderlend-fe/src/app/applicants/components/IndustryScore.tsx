import Image from "next/image";
import { usePathname } from "next/navigation";
import { defaultData } from "~/app/constants";

const IndustryScore = () => {
  const pathname = usePathname();
  const company = defaultData.find(
    (data) => data.key === pathname.split("/")[3]
  );

  return (
    <div className="py-4 px-6 bg-white rounded-lg border shadow-md flex-1 flex flex-col gap-4">
      <h3 className="text-md font-semibold text-gray-800">Industry Score</h3>
      <div className="flex flex-col gap-2">
        <div className="flex-grow-1 text-3xl font-semibold text-gray-80 w-72">
          {company?.score ?? "0"}%
        </div>
        <div className="flex gap-1 items-center">
          <div className="text-sm font-semibold py-1 px-2 rounded-full bg-green-200 text-green-600 flex items-center gap-1">
            <Image src="/trend-up.svg" width={16} height={16} alt="Trend up" />
            <span>18%</span>
          </div>
          <p className="text-sm text-gray-600">from last quarter</p>
        </div>
      </div>
    </div>
  );
};

export default IndustryScore;
