"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path !== "");
  return (
    <div className="flex items-center gap-1">
      <Link href="/dashboard" className="text-xs text-blue-400">
        Home
      </Link>
      <Image src="/chevron.svg" alt="Step" width={24} height={24} />
      {paths.map((path, index) => (
        <div key={`${path}-${index}`} className="flex items-center gap-1">
          <Link
            className={`text-xs ${
              index === paths.length - 1 ? "text-gray-400" : "text-blue-400"
            }`}
            href={
              index !== paths.length - 1
                ? `${paths.slice(0, index).join("/")}`
                : "#"
            }
          >
            {path
              .split(" ")
              .map((path) => path[0]?.toLocaleUpperCase() + path?.slice(1))
              .join(" ")}
          </Link>
          {index < paths.length - 1 && (
            <Image src="/chevron.svg" alt="Step" width={24} height={24} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
