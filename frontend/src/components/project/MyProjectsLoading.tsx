import PageContainer from "../common/PageContainer";
import { Skeleton } from "../ui/skeleton";

function MyProjectsLoading() {
  return (
    <div>
      <Skeleton className="h-4 w-1/2 bg-zinc-300 dark:bg-zinc-600" />
      <Skeleton className="h-4 w-full bg-zinc-300 dark:bg-zinc-600" />
    </div>
  );
}

export default MyProjectsLoading;
