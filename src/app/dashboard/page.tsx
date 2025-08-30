import React from "react";
import DashboardHeader from "./_components/DashboardHeader";
import OverViewCards from "./_components/OverViewCards";
import InfluencerTable from "./_components/InfluencerTable";
import { getAllInfluencers } from "@/service/influencer";
import PaginationWrapper from "@/components/PaginationWrapper";

const Dashboard = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? Number(searchParams.page) : 1;
  const influencers = await getAllInfluencers([
    {
      key: "page",
      value: page.toString(),
    },
  ]);
  console.log(influencers);
  return (
    <div>
      <DashboardHeader />
      <OverViewCards />
      <InfluencerTable influencers={influencers?.data} />
      {influencers?.meta?.totalPages > 1 && (
        <PaginationWrapper
          active={page}
          totalItems={influencers?.meta?.totalItems}
          totalPages={influencers?.meta?.totalPages}
        />
      )}
    </div>
  );
};

export default Dashboard;
