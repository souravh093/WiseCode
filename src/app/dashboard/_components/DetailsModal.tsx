import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  User,
  AtSign,
  Users,
  TrendingUp,
  Globe,
  Mail,
  Calendar,
} from "lucide-react";
import { PlatformIcon } from "@/utils/platformIcons";
import { countries } from "@/constant/countries";
import { TInfluencer } from "@/types/influencer.types";

interface DetailsModalProps {
  influencer: TInfluencer;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const DetailsModal = ({ influencer }: DetailsModalProps) => {
  const countryName =
    countries.find((c) => c.code === influencer.country)?.name ||
    influencer.country;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer flex items-center gap-1 text-primary hover:underline border border-primary/60 px-3 py-1 rounded-md bg-primary/30 hover:bg-primary/40 transition-colors">
          <Eye className="w-4 h-4" />
          Details
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Influencer Details
          </DialogTitle>
        </DialogHeader>

        {/* Profile Header */}
        <div className="bg-gray-900 text-white rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
              <div className="text-white">
                <PlatformIcon
                  platform={
                    influencer.platform as
                      | "INSTAGRAM"
                      | "YOUTUBE"
                      | "TIKTOK"
                      | "X"
                  }
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{influencer.name}</h3>
              <p className="text-gray-300 flex items-center gap-1">
                <AtSign className="w-4 h-4" />  {influencer.username}
              </p>
            </div>
            <Badge className="bg-gray-700 text-white border-gray-600">
              {influencer.platform.charAt(0) +
                influencer.platform.slice(1).toLowerCase()}
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="text-center p-4">
            <CardContent className="p-0">
              <Users className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">
                {formatNumber(influencer.followers)}
              </div>
              <div className="text-xs text-gray-600">Followers</div>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent className="p-0">
              <TrendingUp className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">
                {influencer.engagement_rate}%
              </div>
              <div className="text-xs text-gray-600">Engagement</div>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent className="p-0">
              <Globe className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="text-sm font-bold text-gray-900">
                {countryName}
              </div>
              <div className="text-xs text-gray-600">Location</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Information
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Full Name:</span>
                <span className="text-gray-900">{influencer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Username:</span>
                <span className="text-gray-900">{influencer.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Platform:</span>
                <span className="text-gray-900">
                  {influencer.platform.charAt(0) +
                    influencer.platform.slice(1).toLowerCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Country:</span>
                <span className="text-gray-900">{countryName}</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          {influencer.email && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <a
                    href={`mailto:${influencer.email}`}
                    className="text-gray-900 hover:text-gray-700 hover:underline transition-colors"
                  >
                    {influencer.email}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Content Categories */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Content Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {influencer.categories.map((category: string, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-white text-gray-700 border-gray-300 px-3 py-1 capitalize text-sm"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Timeline
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Created:</span>
                <span className="text-gray-900">
                  {formatDate(influencer.created_at)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Last Updated:</span>
                <span className="text-gray-900">
                  {formatDate(influencer.updated_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
