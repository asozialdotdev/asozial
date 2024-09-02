import { Skeleton } from "@/components/ui/skeleton";
import PageContainer from "../common/containers/PageContainer";

function ParentPostLoading() {
  return (
    <PageContainer className="w-full max-w-screen-md">
      <section className="-mt-10 w-full gap-1 rounded-md border-zinc-300 py-10 hover:bg-zinc-100 dark:border-zinc-600 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800 lg:px-8">
        <div className="flex flex-col items-start gap-4">
          <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          <div className="mb-8 flex w-full flex-col gap-8 space-y-2">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-4 w-[150px] bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-4 w-1/2 bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-4 w-1/2 bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-4 w-[150px] bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-4 w-[150px] bg-zinc-300 dark:bg-zinc-600" />
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-20 w-full bg-zinc-300 dark:bg-zinc-600" />
              <Skeleton className="h-8 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
            </div>

            <div className="mt-8 flex flex-col items-start gap-4 lg:flex-row">
              <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="flex w-full flex-col gap-2 space-y-2">
                <Skeleton className="h-4 w-[150px] bg-zinc-300 dark:bg-zinc-600" />
                <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
                <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start gap-4 lg:flex-row">
              <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="flex w-full flex-col gap-2 space-y-2">
                <Skeleton className="h-4 w-[150px] bg-zinc-300 dark:bg-zinc-600" />
                <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
                <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start gap-4 lg:flex-row">
              <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="flex w-full flex-col gap-2 space-y-2">
                <Skeleton className="h-4 w-[150px] bg-zinc-300 dark:bg-zinc-600" />
                <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
                <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default ParentPostLoading;
