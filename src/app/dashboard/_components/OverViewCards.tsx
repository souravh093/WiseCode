import { Card } from "@/components/ui/card";
import { overviewInfluencer } from "@/service/overviews";
import { Earth, Star, TrendingUp, Users } from "lucide-react";

const OverViewCards = async () => {
  const overViewData = await overviewInfluencer();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10 container">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg">Total Influencers</h1>
          <Users className="size-4" />
        </div>
        <h1 className="text-2xl font-semibold">
          {overViewData?.data.totalInfluncers || 0}
        </h1>
      </Card>
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg">Total Reach</h1>
          <TrendingUp className="size-4" />
        </div>
        <h1 className="text-2xl font-semibold">
          {Math.round(
            (overViewData?.data?.totalReach._sum?.followers || 0) / 1000000000
          )}{" "}
          B
        </h1>
      </Card>
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg">Avg Engagement</h1>
          <Star className="size-4" />
        </div>
        <h1 className="text-2xl font-semibold">
          {Number(
            overViewData?.data.averageEngagement?._avg.engagement_rate
          ).toFixed(2) || 0}{" "}
          %
        </h1>
      </Card>
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg">Platforms</h1>
          <Earth className="size-4" />
        </div>
        <h1 className="text-2xl font-semibold">{4}</h1>
      </Card>
    </div>
  );
};

export default OverViewCards;
