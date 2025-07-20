import { Skeleton } from "@radix-ui/themes";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Pagination skeleton */}
      <div className="flex justify-left gap-2 mt-6">
        <Skeleton inert className="h-8 w-14" />
        <Skeleton inert className="h-8 w-28" />
        <Skeleton inert className="h-8 w-14" />
      </div>
      {/* Table skeleton */}
      <div className="space-y-3">
        <Skeleton inert className="h-12 w-full" /> {/* Header */}
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton inert key={i} className="h-16 w-full" />
        ))}
      </div>
      {/* Pagination skeleton */}
      <div className="flex justify-left gap-2 mt-6">
        <Skeleton inert className="h-8 w-14" />
        <Skeleton inert className="h-8 w-28" />
        <Skeleton inert className="h-8 w-14" />
      </div>
    </div>
  );
}
