import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import moment from "moment";
import Image from "next/image";
import React from "react";

type TCompany = {
  name: string;
  score: number;
  status: "pending" | "approved" | "rejected";
  businessType: string;
  dateApplied: string;
  actions: null;
};

const defaultData: TCompany[] = [
  {
    name: "Rumah Sdn Bhd",
    score: 92,
    status: "pending",
    businessType: "Tourism",
    dateApplied: moment().format("DD/MM/YYYY"),
    actions: null,
  },
  {
    name: "Newell Road Sdn Bhd",
    score: 69,
    status: "pending",
    businessType: "Tourism",
    dateApplied: moment().format("DD/MM/YYYY"),
    actions: null,
  },
  {
    name: "Air Shad Sdn Bhd",
    score: 69,
    status: "pending",
    businessType: "Tourism",
    dateApplied: moment().format("DD/MM/YYYY"),
    actions: null,
  },
  {
    name: "Farfar Sdn Bhd",
    score: 92,
    status: "pending",
    businessType: "Tourism",
    dateApplied: moment().format("DD/MM/YYYY"),
    actions: null,
  },
  {
    name: "Rumah Sdn Bhd",
    score: 92,
    status: "pending",
    businessType: "Tourism",
    dateApplied: moment().format("DD/MM/YYYY"),
    actions: null,
  },
  {
    name: "Rumah Sdn Bhd",
    score: 92,
    status: "pending",
    businessType: "Tourism",
    dateApplied: moment().format("DD/MM/YYYY"),
    actions: null,
  },
  {
    name: "Rumah Sdn Bhd",
    score: 92,
    status: "pending",
    businessType: "Tourism",
    dateApplied: moment().format("DD/MM/YYYY"),
    actions: null,
  },
  {
    name: "Rumah Sdn Bhd",
    score: 92,
    status: "pending",
    businessType: "Tourism",
    dateApplied: moment().format("DD/MM/YYYY"),
    actions: null,
  },
];

const columnHelper = createColumnHelper<TCompany>();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Business Name",
  }),
  columnHelper.accessor("score", {
    header: () => "Score",
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) =>
      info.getValue()[0].toLocaleUpperCase() + info.getValue().slice(1),
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
            className="hover:bg-slate-100 [&>*:last-child]:flex [&>*:last-child]:justify-center"
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
