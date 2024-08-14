import clsx from "clsx";

type PageTitleProps = {
  children: React.ReactNode;
  className?: string;
};
function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1
      className={clsx(
        "tracking-wide' text-3xl font-bold text-dark dark:text-light",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export default PageTitle;
