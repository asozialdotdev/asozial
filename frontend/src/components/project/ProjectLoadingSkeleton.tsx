import PageContainer from "../common/containers/PageContainer";
import { Skeleton } from "../ui/skeleton";

function ProjectLoadingSkeleton() {
  return (
    <PageContainer className="w-full max-w-screen-md">
      <section className="mt-2 flex w-full flex-col gap-1 border-zinc-300 pb-4 px-4 hover:bg-zinc-100 dark:border-zinc-600 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800">
        <div className="flex items-start gap-4">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col items-center justify-center">
              <Skeleton className="h-60 -mt-6 bg-zinc-300 dark:bg-zinc-600 w-[150%]" />

            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-4 w-[100px] bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-4 w-[200px] bg-zinc-300 dark:bg-zinc-600" />
            </div>
            <Skeleton className="h-4 w-[80px] bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-[150px] bg-zinc-300 dark:bg-zinc-600" />

            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default ProjectLoadingSkeleton;
