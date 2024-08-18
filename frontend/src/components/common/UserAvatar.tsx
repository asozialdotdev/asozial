import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserAvatarProps = {
  src: string;
  name: string;
  className?: string;
};

function UserAvatar({ src, name, className }: UserAvatarProps) {
  return (
    <Avatar className={clsx("flex-shrink-0", className)}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
