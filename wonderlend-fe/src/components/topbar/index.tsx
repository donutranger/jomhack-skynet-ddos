"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Topbar = () => {
  const pathname = usePathname();

  return (
    <div className="h-14 bg-blue-600 sticky top-0 flex items-center justify-between px-6 z-20">
      <Link href="/dashboard" className="flex gap-4 items-center">
        <Image
          src="/wonderlend.svg"
          alt="Wonderlend Logo"
          width={32}
          height={32}
        />
        <p className="font-bold text-white">WonderLend</p>
      </Link>
      <div className="flex gap-4">
        <div className="flex gap-4 border border-gray-400 px-2 py-1 rounded-xl text-sm w-60 bg-white">
          <Image src="/search.svg" alt="Search icon" width={16} height={16} />
          <input type="text" placeholder="Search..." className="outline-none" />
        </div>
        <Image
          src={
            ["/dashboard", "/applicants/details"].find((link) =>
              pathname.includes(link)
            )
              ? "/hlb-acc-icon.svg"
              : "/startup-acc-icon.svg"
          }
          width={32}
          height={32}
          alt="Account icon"
        />
      </div>
    </div>
  );
};

export default Topbar;
