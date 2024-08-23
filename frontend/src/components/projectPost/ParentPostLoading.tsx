import { Skeleton } from "@/components/ui/skeleton";

function ParentPostLoading() {
  return (
    <div className="flex w-full items-start space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
      <div className="w-full space-y-2 flex flex-col gap-2">
        <Skeleton className="h-4 w-[150px] bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-4 w-1/2 bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="mt-4 h-4 w-1/2 bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="mt-4 h-4 w-[150px] bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="mt-4 h-4 w-[150px] bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="mt-4 h-4 w-[100px] bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="mt-4 h-4 w-[100px] bg-zinc-300 dark:bg-zinc-600" />

      </div>
    </div>
  );
}

export default ParentPostLoading;
