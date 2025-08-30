import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="bg-white shadow p-4">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <Skeleton className="h-8 w-48" /> {/* Title */}
              <Skeleton className="h-6 w-16 rounded-full" /> {/* Badge */}
            </div>
            <div className="flex gap-3 items-center">
              <Skeleton className="h-5 w-32" /> {/* Email */}
              <Skeleton className="h-9 w-20" /> {/* Logout button */}
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10 container">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-5 w-24" /> {/* Card title */}
              <Skeleton className="h-4 w-4" /> {/* Icon */}
            </div>
            <Skeleton className="h-8 w-16" /> {/* Card value */}
          </Card>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto container mt-10">
        <div className="bg-white border border-gray-200 rounded-lg">
          {/* Table Header */}
          <div className="bg-gray-100 p-4 border-b">
            <div className="grid grid-cols-4 gap-4">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>

          {/* Table Rows */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
            <div
              key={row}
              className="p-4 border-b border-gray-100 last:border-b-0"
            >
              <div className="grid grid-cols-4 gap-4 items-center">
                {/* Name column with avatar */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" /> {/* Avatar */}
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" /> {/* Name */}
                    <Skeleton className="h-3 w-20" /> {/* Username */}
                  </div>
                </div>

                {/* Platform column */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded" /> {/* Platform icon */}
                  <Skeleton className="h-4 w-16" /> {/* Platform name */}
                </div>

                {/* Followers column */}
                <Skeleton className="h-4 w-20" />

                {/* Engagement column */}
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between mt-4 container mb-10">
        <Skeleton className="h-5 w-32" /> {/* "Showing X entries" text */}
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md shadow-sm p-1">
          <Skeleton className="h-8 w-8" /> {/* Previous button */}
          <Skeleton className="h-8 w-8" /> {/* Page 1 */}
          <Skeleton className="h-8 w-8" /> {/* Page 2 */}
          <Skeleton className="h-8 w-8" /> {/* Page 3 */}
          <Skeleton className="h-8 w-8" /> {/* Next button */}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
