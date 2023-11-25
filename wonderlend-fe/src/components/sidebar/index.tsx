import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linkMapper = {
  home: ["/success", "/dashboard"],
};

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (key: keyof typeof linkMapper) =>
    linkMapper[key].includes(pathname);

  return (
    <div className="absolute left-0 top-0 h-[94vh] w-14 shadow-lg bg-white z-10 flex flex-col gap-3 items-center pt-6">
      <Link
        href="/dashboard"
        className={`${
          isActive("home")
            ? "bg-blue-600 hover:bg-blue-800"
            : "bg-white hover:bg-slate-200"
        } flex w-10 h-10 rounded-lg justify-center items-center cursor-pointer`}
      >
        <Image
          src={isActive("home") ? "/home-active.svg" : "/home.svg"}
          alt="Home icon"
          width={24}
          height={24}
        />
      </Link>
      <Link
        href="#"
        className="flex w-10 h-10 rounded-lg justify-center items-center hover:bg-slate-200 cursor-pointer"
      >
        <Image src="/proposal.svg" alt="Proposal icon" width={24} height={24} />
      </Link>
      <Link
        href="#"
        className="flex w-10 h-10 rounded-lg justify-center items-center hover:bg-slate-200 cursor-pointer"
      >
        <Image src="/report.svg" alt="Report icon" width={24} height={24} />
      </Link>
      <Link
        href="#"
        className="flex w-10 h-10 rounded-lg justify-center items-center hover:bg-slate-200 cursor-pointer"
      >
        <Image src="/funds.svg" alt="Wallet icon" width={24} height={24} />
      </Link>
      <Link
        href="#"
        className="flex w-10 h-10 rounded-lg justify-center items-center hover:bg-slate-200 cursor-pointer"
      >
        <Image src="/planner.svg" alt="Planner icon" width={24} height={24} />
      </Link>
    </div>
  );
};

export default Sidebar;
