import Header from "@/components/header";
import React, { FC } from "react";

type ChildrenProps = {
  children: React.ReactNode;
};
const DashboardLayout: FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">{children}</main>
    </>
  );
};

export default DashboardLayout;
