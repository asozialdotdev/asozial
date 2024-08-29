import Link from "next/link";
import { Card, CardDescription } from "@/components/ui/card";
import UserAvatar from "../ui/image/UserAvatar";
import AcceptDeclineFriendshipForm from "@/components/requests/AcceptDeclineFriendshipForm";
import { Friendship } from "@/types/Friendship";
type SidebarFriendsRequestsCardProps = {
  friendship: Friendship;
};
function SidebarFriendsRequestsCard({
  friendship,
}: SidebarFriendsRequestsCardProps) {
  return (
    <Card
      key={friendship._id.toString()}
      className="relative mb-4 w-full border-dashed border-zinc-300 bg-inherit bg-zinc-100 py-2 pl-4 pr-[.4rem] hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10"
    >
      <div className="flex flex-col items-center gap-2">
        <CardDescription className="text-center">
          <Link href={`/${friendship.senderId?.username}`}>
            <span className="text-dark hover:opacity-75 dark:text-light">
              {friendship.senderId?.username}
            </span>{" "}
            wants to be friends
          </Link>
        </CardDescription>
        <div className="flex items-start gap-4">
          <AcceptDeclineFriendshipForm friendshipId={friendship._id} sidebar />
          <UserAvatar
            src={
              friendship.senderId?.info.image ||
              "https://avatars.dicebear.com/api/avataaars/username.svg"
            }
            username={friendship.senderId?.username || "username"}
            userId={friendship.senderId?._id || "123"}
            className="h-12 w-12"
          />
        </div>
      </div>
    </Card>
  );
}

export default SidebarFriendsRequestsCard;
