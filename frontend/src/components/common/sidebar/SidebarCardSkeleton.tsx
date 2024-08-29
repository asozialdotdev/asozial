import { Skeleton } from "@/components/ui/skeleton";

type SidebarCardSkeletonProps = {
  user?: boolean;
  project?: boolean;
};

function SidebarCardSkeleton({ user, project }: SidebarCardSkeletonProps) {
  return (
    <>
      <div className="relative w-full rounded-md border border-dashed border-zinc-300 bg-inherit bg-zinc-100 py-2 pl-4 pr-[.4rem] hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-600/30 dark:hover:bg-zinc-600/10">
        <div className="flex flex-col items-center gap-1">
          {/* Header Skeleton */}
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <Skeleton className="h-4 w-3/4 rounded bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-2/4 rounded bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {project && (
            <>
              {/* Avatar and Buttons Skeleton */}
              <div className="flex w-full items-center gap-4">
                {/* Avatar */}
                <Skeleton className="h-12 w-12 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />

                {/* Buttons Skeleton */}
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16 rounded bg-zinc-300 dark:bg-zinc-600" />
                  <Skeleton className="h-5 w-16 rounded bg-zinc-300 dark:bg-zinc-600" />
                </div>
              </div>
            </>
          )}

          {user && (
            <>
              {/* Avatar and Buttons Skeleton */}
              <div className="flex w-full items-center">
                {/* Buttons Skeleton */}
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16 rounded bg-zinc-300 dark:bg-zinc-600" />
                  <Skeleton className="h-5 w-16 rounded bg-zinc-300 dark:bg-zinc-600" />
                </div>

                {/* Avatar */}
                <Skeleton className="ml-auto mr-4 h-12 w-12 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SidebarCardSkeleton;
