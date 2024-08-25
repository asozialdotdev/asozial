import PageContainer from "@/components/common/containers/PageContainer";
import { Skeleton } from "@/components/ui/skeleton";

function ProjectCardLoadingSkeleton() {
  return (
    <PageContainer className="2xl:max-w-screen-xl">
      <div className="grid grid-cols-1 gap-4 pb-6 lg:grid-cols-2 2xl:grid-cols-3 2xl:gap-8">
        <div className="max-h-[28rem] min-h-fit min-w-[20rem] max-w-[20rem] border-dashed border-zinc-300 bg-zinc-100 pl-1 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800 md:bg-inherit md:dark:bg-inherit">
          {/* Title and description skeleton */}
          <div className="p-4">
            <Skeleton className="mb-2 h-6 w-3/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="mb-4 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="mb-4 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Tech Stack skeleton */}
          <div className="flex w-full flex-wrap gap-2 px-4">
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Members skeleton */}
          <div className="px-4 py-6">
            <Skeleton className="mb-6 h-4 w-2/3 bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Owner skeleton */}
          <div className="flex flex-col items-start gap-2 p-4">
            <Skeleton className="mb-2 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Status skeleton */}
          <div className="p-4">
            <Skeleton className="h-4 w-2/3 bg-zinc-300 dark:bg-zinc-600" />
          </div>
        </div>

        <div className="max-h-[28rem] min-h-fit min-w-[20rem] max-w-[20rem] border-dashed border-zinc-300 bg-zinc-100 pl-1 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800 md:bg-inherit md:dark:bg-inherit">
          {/* Title and description skeleton */}
          <div className="p-4">
            <Skeleton className="mb-2 h-6 w-3/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="mb-4 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="mb-4 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Tech Stack skeleton */}
          <div className="flex w-full flex-wrap gap-2 px-4">
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Members skeleton */}
          <div className="px-4 py-6">
            <Skeleton className="mb-6 h-4 w-2/3 bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Owner skeleton */}
          <div className="flex flex-col items-start gap-2 p-4">
            <Skeleton className="mb-2 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Status skeleton */}
          <div className="p-4">
            <Skeleton className="h-4 w-2/3 bg-zinc-300 dark:bg-zinc-600" />
          </div>
        </div>

        <div className="max-h-[28rem] min-h-fit min-w-[20rem] max-w-[20rem] border-dashed border-zinc-300 bg-zinc-100 pl-1 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800 md:bg-inherit md:dark:bg-inherit">
          {/* Title and description skeleton */}
          <div className="p-4">
            <Skeleton className="mb-2 h-6 w-3/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="mb-4 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="mb-4 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Tech Stack skeleton */}
          <div className="flex w-full flex-wrap gap-2 px-4">
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Members skeleton */}
          <div className="px-4 py-6">
            <Skeleton className="mb-6 h-4 w-2/3 bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Owner skeleton */}
          <div className="flex flex-col items-start gap-2 p-4">
            <Skeleton className="mb-2 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Status skeleton */}
          <div className="p-4">
            <Skeleton className="h-4 w-2/3 bg-zinc-300 dark:bg-zinc-600" />
          </div>
        </div>
        <div className="max-h-[28rem] min-h-fit min-w-[20rem] max-w-[20rem] border-dashed border-zinc-300 bg-zinc-100 pl-1 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800 md:bg-inherit md:dark:bg-inherit">
          {/* Title and description skeleton */}
          <div className="p-4">
            <Skeleton className="mb-2 h-6 w-3/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="mb-4 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="mb-4 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Tech Stack skeleton */}
          <div className="flex w-full flex-wrap gap-2 px-4">
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Members skeleton */}
          <div className="px-4 py-6">
            <Skeleton className="mb-6 h-4 w-2/3 bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Owner skeleton */}
          <div className="flex flex-col items-start gap-2 p-4">
            <Skeleton className="mb-2 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Status skeleton */}
          <div className="p-4">
            <Skeleton className="h-4 w-2/3 bg-zinc-300 dark:bg-zinc-600" />
          </div>
        </div>

        <div className="max-h-[28rem] min-h-fit min-w-[20rem] max-w-[20rem] border-dashed border-zinc-300 bg-zinc-100 pl-1 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800 md:bg-inherit md:dark:bg-inherit">
          {/* Title and description skeleton */}
          <div className="p-4">
            <Skeleton className="mb-2 h-6 w-3/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="mb-4 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="mb-4 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Tech Stack skeleton */}
          <div className="flex w-full flex-wrap gap-2 px-4">
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Members skeleton */}
          <div className="px-4 py-6">
            <Skeleton className="mb-6 h-4 w-2/3 bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Owner skeleton */}
          <div className="flex flex-col items-start gap-2 p-4">
            <Skeleton className="mb-2 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Status skeleton */}
          <div className="p-4">
            <Skeleton className="h-4 w-2/3 bg-zinc-300 dark:bg-zinc-600" />
          </div>
        </div>

        <div className="max-h-[28rem] min-h-fit min-w-[20rem] max-w-[20rem] border-dashed border-zinc-300 bg-zinc-100 pl-1 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800 md:bg-inherit md:dark:bg-inherit">
          {/* Title and description skeleton */}
          <div className="p-4">
            <Skeleton className="mb-2 h-6 w-3/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="mb-4 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="mb-4 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Tech Stack skeleton */}
          <div className="flex w-full flex-wrap gap-2 px-4">
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Members skeleton */}
          <div className="px-4 py-6">
            <Skeleton className="mb-6 h-4 w-2/3 bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Owner skeleton */}
          <div className="flex flex-col items-start gap-2 p-4">
            <Skeleton className="mb-2 h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Status skeleton */}
          <div className="p-4">
            <Skeleton className="h-4 w-2/3 bg-zinc-300 dark:bg-zinc-600" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default ProjectCardLoadingSkeleton;
