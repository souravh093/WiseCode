import React from "react";
import DashboardHeader from "./_components/DashboardHeader";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardHeader />
      {children}
    </div>
  );
};

export default DashboardLayout;
