"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { defaultData } from "~/app/constants";

const CompanyName = () => {
  const pathname = usePathname();
  const company = defaultData.find(
    (data) => data.key === pathname.split("/")[3]
  );
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md border border-gray-300">
      <h1 className="text-xl text-gray-800 font-semibold">
        {company?.name ??
          pathname
            .split("/")[3]
            .split("[A-Z]*")
            .map((word) => word[0].toLocaleUpperCase() + word.slice(1))
            .join(" ")}
      </h1>
      {company?.status === "pending" && (
        <div className="flex gap-2">
          <button className="bg-blue-500 font-semibold text-white px-4 h-8 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-1">
            <Image src="/check.svg" alt="Approve" width={16} height={16} />
            Approve
          </button>
          <button className="bg-white font-semibold text-gray-600 px-4 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 flex items-center gap-1">
            <Image src="/x.svg" alt="Approve" width={16} height={16} />
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyName;
