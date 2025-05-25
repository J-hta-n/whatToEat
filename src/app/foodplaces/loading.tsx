// app/food-places/loading.tsx
import { Skeleton } from "@radix-ui/themes";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-10">
        <Skeleton inert className="h-8 w-64 mx-auto mb-2" />
        <Skeleton inert className="h-4 w-96 mx-auto" />
      </div>

      {/* Filter panel skeleton */}
      <div className="flex gap-4 mb-6">
        <Skeleton inert className="h-10 w-32" />
        <Skeleton inert className="h-10 w-32" />
        <Skeleton inert className="h-10 w-32" />
      </div>

      {/* Table skeleton */}
      <div className="space-y-3">
        <Skeleton inert className="h-12 w-full" /> {/* Header */}
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton inert key={i} className="h-16 w-full" />
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center gap-2 mt-6">
        <Skeleton inert className="h-8 w-8" />
        <Skeleton inert className="h-8 w-8" />
        <Skeleton inert className="h-8 w-8" />
      </div>
    </div>
  );
}
