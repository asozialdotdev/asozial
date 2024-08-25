import PageContainer from "@/components/common/containers/PageContainer";
import { Skeleton } from "@/components/ui/skeleton";

function NewProjectLoadingSkeleton() {
  return (
    <PageContainer className="w-full max-w-screen-md">
      <section className="mt-2 flex w-full flex-col gap-1 border-zinc-300 p-4 hover:bg-zinc-100 dark:border-zinc-600 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800">
        <div className="flex flex-col items-start gap-4">
          <Skeleton className="h-8 w-full bg-zinc-300 dark:bg-zinc-600" />

          <Skeleton className="mt-8 h-4 w-[15%] bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-8 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="mt-4 h-4 w-[15%] bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-8 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="mt-4 h-4 w-[15%] bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-8 w-full bg-zinc-300 dark:bg-zinc-600" />

          <Skeleton className="mt-4 h-4 w-[15%] bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-8 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="mt-4 h-4 w-[15%] bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-40 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="mt-4 h-4 w-[15%] bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-8 w-1/4 bg-zinc-300 dark:bg-zinc-600" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
        </div>
        <Skeleton className="mt-8 h-4 w-[15%] bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-8 w-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="mt-4 h-4 w-[15%] bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-8 w-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="mt-4 h-4 w-[15%] bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-8 w-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="mt-4 h-4 w-[15%] bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-8 w-full bg-zinc-300 dark:bg-zinc-600" />
      </section>
    </PageContainer>
  );
}

export default NewProjectLoadingSkeleton;
