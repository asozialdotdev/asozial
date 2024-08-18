import { format, formatDistance } from "date-fns";

type ProjectPostContentProps = {
  name: string;
  title: string;
  content: string;
  createdAt: Date;
};

function ProjectPostContent({
  name,
  title,
  content,
  createdAt,
}: ProjectPostContentProps) {
  const formattedCreatedAt2 = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
  })
    .replace("about", "")
    .replace("minutes", "min");

  const formattedCreatedAt = format(
    new Date(createdAt),
    "dd, MMM yyyy - HH:mm",
  );

  return (
    <div className="flex-grow">
      {/* Content */}
      <p className="font-medium text-neutral-500 dark:text-neutral-400">
        {name}
      </p>
      <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
      <p className="mt-2 text-justify font-light text-dark dark:text-light">
        {content}
      </p>
      <p className="mb-4 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        <small>Posted </small>
        {formattedCreatedAt2}
      </p>
    </div>
  );
}

export default ProjectPostContent;
