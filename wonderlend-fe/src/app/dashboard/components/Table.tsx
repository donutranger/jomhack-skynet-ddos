import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { TCompany, defaultData } from "~/app/constants";

const columnHelper = createColumnHelper<TCompany>();

const statusColorMapper: Record<
  TCompany["status"],
  { background: string; text: string }
> = {
  pending: {
    background: "bg-gray-100",
    text: "text-gray-600",
  },
  approved: {
    background: "bg-green-100",
    text: "text-green-600",
  },
  rejected: {
    background: "bg-red-100",
    text: "text-red-600",
  },
};

const columns = [
  columnHelper.accessor("name", {
    header: () => "Business Name",
  }),
  columnHelper.accessor("score", {
    header: () => "Score",
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => (
      <span
        className={`p-2 rounded-full text-sm px-2 py-1 font-semibold ${
          statusColorMapper[info.getValue()].background
        } ${statusColorMapper[info.getValue()].text}`}
      >
        {info.getValue()[0].toLocaleUpperCase() + info.getValue().slice(1)}
      </span>
    ),
  }),
  columnHelper.accessor("businessType", {
    header: "Business Type",
  }),
  columnHelper.accessor("dateApplied", {
    header: "Date applied",
  }),
  columnHelper.accessor("actions", {
    header: "",
    cell: () => null,
  }),
];

const Table = () => {
  const companyInfoString =
    typeof window !== "undefined"
      ? window.localStorage.getItem("organization-info")
      : null;
  const companyFilesString =
    typeof window !== "undefined"
      ? localStorage.getItem("organization-files")
      : null;
  const companyInfo = companyInfoString ? JSON.parse(companyInfoString) : null;
  const companyFiles = companyFilesString
    ? JSON.parse(companyFilesString)
    : null;

  if (
    !!companyInfo &&
    !!companyFiles &&
    Object.keys(companyInfo).length &&
    Object.keys(companyFiles).length &&
    !defaultData.find((data) => data.name === companyInfo?.company_name)
  )
    defaultData.unshift({
      key: companyInfo?.company_name.split(" ").join("-").toLowerCase(),
      name: companyInfo?.company_name as string,
      score: companyFiles?.creditScore,
      status: "pending",
      businessType: "Tourism",
      actions: null,
      dateApplied: moment().from(new Date()),
    });

  const router = useRouter();
  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className="w-100 px-8">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            className="[&>*:first-child]:rounded-ss-md [&>*:last-child]:rounded-se-md"
          >
            {headerGroup.headers.map((header, index) => (
              <th
                key={header.id}
                className="text-start py-4 px-3 bg-gray-100 relative"
              >
                <span>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </span>
                {index < headerGroup.headers.length - 2 && (
                  <span className="h-5 border-l border-gray-300 absolute right-2 top-5" />
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="hover:bg-slate-100 [&>*:last-child]:flex [&>*:last-child]:justify-center cursor-pointer"
            onClick={() =>
              router.push(`/applicants/details/${row.original.key}`)
            }
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="py-4 px-3">
                {
                  // @ts-expect-error
                  cell.column.columnDef.accessorKey === "actions" ? (
                    <Image
                      className="cursor-pointer"
                      src="/menu.svg"
                      alt="Menu"
                      width={24}
                      height={24}
                      color="black"
                    />
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
