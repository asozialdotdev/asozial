import { contributors } from "@/constants";
import UserAvatar from "../ui/UserAvatar";

const ContributorsImages = () => {
  return (
    <div className="flex flex-row gap-2">
      {contributors.map((contributor) => (
        <UserAvatar
          key={contributor.id}
          src={contributor.github + ".png"}
          username={contributor.github}
          userId={contributor.id}
          className="h-4 w-4"
        />
      ))}
    </div>
  );
};

export default ContributorsImages;
