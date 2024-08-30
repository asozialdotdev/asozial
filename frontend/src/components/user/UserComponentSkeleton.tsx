import { Skeleton } from "@/components/ui/skeleton";
import PageContainer from "../common/containers/PageContainer";

function UserComponentSkeleton() {
  return (
    <PageContainer>
      <section className="flex w-full animate-pulse flex-col gap-8 pb-4 text-lg font-light">
        {/* Title */}
        <div className="mb-6 flex justify-center w-full">
          <Skeleton className="h-6 w-1/3 rounded bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* Avatar and Button */}
        <div className="flex w-full items-center justify-center gap-4">
          <Skeleton className="h-28 w-28 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="flex flex-col justify-evenly gap-4">
            {/* Button */}
            <Skeleton className="h-8 w-24 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>

        {/* Four lines (2 on 2) */}
        <div className="flex w-full flex-wrap justify-center gap-4">
          <Skeleton className="h-4 w-2/5 rounded bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-4 w-2/5 rounded bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-4 w-2/5 rounded bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-4 w-2/5 rounded bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* Larger Lines */}
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-6 w-2/3 rounded bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-6 w-full rounded bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* Friends Avatars */}
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>
      </section>
    </PageContainer>
  );
}

export default UserComponentSkeleton;
