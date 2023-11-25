import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="h-14 bg-blue-600 sticky flex items-center px-6">
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

export default Navbar;
