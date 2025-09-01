import { TInfluencer } from "@/types/influencer.types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { influencersTableHeaders } from "@/constant/table-header/influencersTableHeaders";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BadgeCheck, Edit } from "lucide-react";
import { PlatformIcon } from "@/utils/platformIcons";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DetailsModal from "./DetailsModal";
import DeleteInfluencer from "./DeleteInfluencer";
import { loggedUser } from "@/service/auth";

const InfluencerTable = async ({
  influencers,
}: {
  influencers: TInfluencer[];
}) => {
  const currentUser = await loggedUser();
  return (
    <div className="overflow-x-auto container mt-10">
      <div className="shadow-sm border p-4 rounded-md">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Influencers</h1>
          <p className="text-sm text-gray-500">
            List of all influencers in the directory
          </p>
        </div>

        <Table>
          <TableCaption>
            A list of all the influencers in the directory.
          </TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              {influencersTableHeaders.map((header, index) => (
                <TableHead key={index} className="">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {influencers.map((influencer) => (
              <TableRow key={influencer.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>
                        {influencer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center gap-1">
                        {influencer.name}
                        <BadgeCheck className="size-4 text-green-500" />
                      </div>
                      <span className="text-xs text-gray-500">
                        @{influencer.username}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <PlatformIcon platform={influencer.platform} size={40} />
                </TableCell>
                <TableCell>
                  {(influencer.followers / 1000000).toFixed(1)}M
                </TableCell>
                <TableCell>{influencer.engagement_rate}%</TableCell>
                <TableCell>{influencer.country}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {influencer.categories.slice(0, 2).map((category) => (
                      <Badge
                        key={category}
                        variant="outline"
                        className="text-xs"
                      >
                        {category}
                      </Badge>
                    ))}
                    {influencer.categories.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{influencer.categories.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right flex items-center gap-1">
                  <DetailsModal influencer={influencer} />
                  {currentUser?.role === "ADMIN" && (
                    <>
                      <Link href={`/dashboard/${influencer.id}`}>
                        <Button variant="default" size="sm" className="cursor-pointer">
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      </Link>
                      <DeleteInfluencer id={influencer.id} />
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InfluencerTable;
