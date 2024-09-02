import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component available
import PageContainer from "../common/containers/PageContainer";

function UserCardLoadingSkeleton() {
  return (
    <PageContainer>
      <li className="relative flex w-full flex-col gap-4 rounded-lg border-2 border-dashed border-zinc-300 bg-inherit bg-zinc-100 px-8 py-8 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10">
        <div className="flex flex-col gap-4">
          {/* User Card on the Left */}
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-6 w-32 bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20 bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <section className="flex flex-wrap items-center gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  <Skeleton className="h-4 w-10 bg-zinc-300 dark:bg-zinc-600" />
                </div>
              ))}
            </section>

            <div className="self-end">
              {/* Friend Form Button Skeleton */}
              <Skeleton className="h-8 w-24 rounded bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-6 w-16 rounded bg-zinc-300 dark:bg-zinc-600"
            />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {/* Bio Skeleton */}
          <Skeleton className="h-4 w-full rounded bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-3/4 rounded bg-zinc-300 dark:bg-zinc-600" />
        </div>
      </li>

      <li className="relative flex w-full flex-col gap-4 rounded-lg border-2 border-dashed border-zinc-300 bg-inherit bg-zinc-100 px-8 py-8 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10">
        <div className="flex flex-col gap-4">
          {/* User Card on the Left */}
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-6 w-32 bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20 bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <section className="flex flex-wrap items-center gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  <Skeleton className="h-4 w-10 bg-zinc-300 dark:bg-zinc-600" />
                </div>
              ))}
            </section>

            <div className="self-end">
              {/* Friend Form Button Skeleton */}
              <Skeleton className="h-8 w-24 rounded bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-6 w-16 rounded bg-zinc-300 dark:bg-zinc-600"
            />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {/* Bio Skeleton */}
          <Skeleton className="h-4 w-full rounded bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-3/4 rounded bg-zinc-300 dark:bg-zinc-600" />
        </div>
      </li>

      <li className="relative flex w-full flex-col gap-4 rounded-lg border-2 border-dashed border-zinc-300 bg-inherit bg-zinc-100 px-8 py-8 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10">
        <div className="flex flex-col gap-4">
          {/* User Card on the Left */}
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-6 w-32 bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20 bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <section className="flex flex-wrap items-center gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  <Skeleton className="h-4 w-10 bg-zinc-300 dark:bg-zinc-600" />
                </div>
              ))}
            </section>

            <div className="self-end">
              {/* Friend Form Button Skeleton */}
              <Skeleton className="h-8 w-24 rounded bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-6 w-16 rounded bg-zinc-300 dark:bg-zinc-600"
            />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {/* Bio Skeleton */}
          <Skeleton className="h-4 w-full rounded bg-zinc-300 dark:bg-zinc-600" />
          <Skeleton className="h-4 w-3/4 rounded bg-zinc-300 dark:bg-zinc-600" />
        </div>
      </li>
    </PageContainer>
  );
}

export default UserCardLoadingSkeleton;
