import React from "react";
import DashboardHeader from "./_components/DashboardHeader";
import OverViewCards from "./_components/OverViewCards";

const Dashboard = async () => {
  return (
    <div>
      <DashboardHeader />
      <OverViewCards />
    </div>
  );
};

export default Dashboard;
