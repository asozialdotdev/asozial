import { Skeleton } from "../ui/skeleton";

function MessageLoading() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <Skeleton className="h-4 w-[100px] bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-4 w-[200px] bg-zinc-300 dark:bg-zinc-600" />
      </div>
      <Skeleton className="h-4 w-[80px] bg-zinc-300 dark:bg-zinc-600" />
      <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
      <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
      <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
      <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
      <Skeleton className="mt-4 h-4 w-[150px] bg-zinc-300 dark:bg-zinc-600" />
      <Skeleton className="h-4 w-[120px] bg-zinc-300 dark:bg-zinc-600" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        <Skeleton className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
      </div>
    </div>
  );
}

export default MessageLoading;
