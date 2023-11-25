import React from "react";
import Image from "next/image";

const Topbar = () => {
  return (
    <div className="h-14 bg-blue-600 sticky top-0 flex items-center px-6 z-20">
      <div className="flex gap-4 items-center">
        <Image
          src="/wonderlend.svg"
          alt="Wonderlend Logo"
          width={32}
          height={32}
        />
        <p className="font-bold text-white">WonderLend</p>
      </div>
    </div>
  );
};

export default Topbar;
