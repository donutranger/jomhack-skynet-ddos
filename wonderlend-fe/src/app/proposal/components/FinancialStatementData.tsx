"use client";
import React, { useMemo } from "react";
import useCompanyInfo from "../../hooks/useCompanyInfo";

const FinancialStatementData = () => {
  const { getCompanyData } = useCompanyInfo();
  const data = getCompanyData();

  const formData = useMemo(() => {
    if (!data?.financial_statements?.length) return;

    return [
      {
        title: "Metrics",
        values: [
          "Income statement",
          "Revenue",
          "Balance sheet",
          "Equities",
          "Liabilities",
          "Cashflow Statement",
          "Cash from Operating activities",
          "Cash from Investing activities",
          "Net from Financing activities",
        ],
      },
      // @ts-expect-error
      ...data?.financial_statements?.map((fc) => ({
        title: `FC ${fc.year}`,
        values: [
          null,
          fc.revenue,
          null,
          fc.equity,
          fc.liabilities,
          null,
          fc.cash_from_operations,
          fc.cash_from_investing,
          fc.net_cash,
        ],
      })),
    ];
  }, [data?.financial_statements]);

  if (!data?.financial_statements) return null;

  const subTitles = ["Income statement", "Balance sheet", "Cashflow Statement"];

  return (
    <div className={`grid grid-cols-4`}>
      {formData?.map((fd, index) => (
        <div
          key={`${fd.title}-${index}`}
          className="flex flex-col [&>*:first-child]:rounded-ss-md [&>*:last-child]:rounded-se-md"
        >
          <div className="h-10 p-2 font-bold bg-gray-200">{fd.title}</div>
          {
            // @ts-expect-error
            fd.values?.map((col, index) => (
              <div
                key={`fc-${index}`}
                className={`h-10 p-2 ${
                  subTitles.includes(col) || col === null
                    ? "font-semibold bg-gray-100"
                    : ""
                } `}
              >
                {col}
              </div>
            ))
          }
        </div>
      ))}
    </div>
  );
};

export default FinancialStatementData;
