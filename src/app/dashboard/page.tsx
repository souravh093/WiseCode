import React from "react";
import DashboardHeader from "./_components/DashboardHeader";
import OverViewCards from "./_components/OverViewCards";
import InfluencerTable from "./_components/InfluencerTable";
import { getAllInfluencers } from "@/service/influencer";
import PaginationWrapper from "@/components/PaginationWrapper";
import SearchAndFilter from "./_components/SearchAndFilter";
import { TQuery } from "@/types/query.types";

const Dashboard = async (props: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    platform?: string;
    country?: string;
    category?: string;
    minFollowers?: string;
    sortBy?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? Number(searchParams.page) : 1;

  const queryParams: TQuery[] = [
    {
      key: "page",
      value: page.toString(),
    },
  ];

  if (searchParams?.search) {
    queryParams.push({ key: "search", value: searchParams.search });
  }
  if (searchParams?.platform) {
    queryParams.push({ key: "platform", value: searchParams.platform });
  }
  if (searchParams?.country) {
    queryParams.push({ key: "country", value: searchParams.country });
  }
  if (searchParams?.category) {
    queryParams.push({ key: "category", value: searchParams.category });
  }
  if (searchParams?.minFollowers) {
    queryParams.push({ key: "minFollowers", value: searchParams.minFollowers });
  }
  if (searchParams?.sortBy) {
    queryParams.push({ key: "sortBy", value: searchParams.sortBy });
  }

  const influencers = await getAllInfluencers(queryParams);
  return (
    <div>
      <DashboardHeader />
      <OverViewCards />
      <SearchAndFilter />
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
