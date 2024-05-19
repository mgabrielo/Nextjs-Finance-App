import React from "react";
import Link from "next/link";
import Image from "next/image";
import FinanceLogo from "./(logo-icon)/logo";

const HeaderLogo = () => {
  return (
    <Link href={"/"}>
      <div className="items-center hidden lg:flex">
        <FinanceLogo className="text-white h-6 w-6" />
        <p className=" font-semibold text-white text-2xl ml-2.5">Finance</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
