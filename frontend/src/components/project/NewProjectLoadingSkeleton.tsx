import PageContainer from "@/components/common/containers/PageContainer";
import { Skeleton } from "@/components/ui/skeleton";

function NewProjectLoadingSkeleton() {
  return (
    <PageContainer>
      <div>
        <Skeleton className="mb-4 h-12 w-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="mb-6 h-12 w-full bg-zinc-300 dark:bg-zinc-600" />
        <div className="flex w-full flex-col items-start gap-2">
          <Skeleton className="rounded-1/2 h-12 w-12 bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="rounded-1/2 h-12 w-12 bg-zinc-300 dark:bg-zinc-600" />
          <div className="flex w-full flex-col gap-2 space-y-2">
            <Skeleton className="h-4 w-[150px] bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default NewProjectLoadingSkeleton;
