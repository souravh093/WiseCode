import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => (
  <div className="overflow-x-auto container mt-10">
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="bg-gray-100 p-4 border-b">
        <div className="grid grid-cols-4 gap-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
        <div key={row} className="p-4 border-b border-gray-100 last:border-b-0">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TableSkeleton;
