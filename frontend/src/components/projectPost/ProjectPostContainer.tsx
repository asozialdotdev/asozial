import clsx from "clsx";

function ProjectPostContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-1 rounded-md border border-dashed border-zinc-300 py-10 pl-8 pr-12 hover:bg-zinc-100 dark:border-zinc-600 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default ProjectPostContainer;
