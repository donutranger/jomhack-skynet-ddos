import { usePathname } from "next/navigation";

const LoanDetails = () => {
  const pathname = usePathname();
  const currCompanyName = pathname
    .split("/")[3]
    .split("[A-Z]*")
    .map((word) => word[0].toLocaleUpperCase() + word.slice(1))
    .join(" ");
  const companyInfoString =
    typeof window !== undefined
      ? localStorage.getItem("organization-info")
      : null;
  const tempCompanyData = companyInfoString
    ? JSON.parse(companyInfoString)
    : null;
  const companyInfo =
    tempCompanyData &&
    currCompanyName.toLocaleLowerCase() ===
      tempCompanyData.company_name.toLocaleLowerCase()
      ? tempCompanyData
      : null;
  const MYRFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MYR",
  });

  return (
    <div className="py-4 px-6 bg-white rounded-lg border shadow-md flex items-center">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Amount :</span>
          {companyInfo?.funds_needed
            ? MYRFormat.format(companyInfo.funds_needed)
            : "MYR 40,000"}
        </p>
        <p className="text-sm  text-gray-700 mt-1">
          <span className="font-semibold">Period :</span>{" "}
          {companyInfo?.runway_period ?? "12 Months"}
        </p>
        <p className="text-sm  text-gray-700 mt-1">
          <span className="font-semibold">Loan Rate :</span> 9.67%
        </p>
      </div>
    </div>
  );
};

export default LoanDetails;
