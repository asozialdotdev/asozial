import { useRequests } from "@/context/RequestsContext";
import SidebarCardSkeleton from "./SidebarCardSkeleton";
import ErrorMessage from "../ui/ErrorMessage";
import { Friendship } from "@/types/Friendship";
import SidebarFriendsRequestsCard from "./SidebarFriendsRequestsCard";
import { useSession } from "next-auth/react";

function SidebarFriendsRequestsTable() {
  const session = useSession();
  const actualUserId = session?.data?.user?.id;

  const { friendsRequests, friendsError, friendsLoading } = useRequests();
  const { pending } = friendsRequests;

  const receivedAccepted = pending.filter((friendship: Friendship) => {
    return friendship.receiverId?._id === actualUserId;
  });

  if (friendsLoading) {
    return (
      <>
        <SidebarCardSkeleton user />
        <SidebarCardSkeleton user />
        <SidebarCardSkeleton user />
      </>
    );
  }

  if (friendsError) {
    return <ErrorMessage>{friendsError}</ErrorMessage>;
  }

  if (receivedAccepted.length === 0 || !receivedAccepted) {
    return (
      <p className="mr-4 self-end text-sm text-neutral-500 dark:text-neutral-400">
        No requests yet
      </p>
    );
  }

  const renderRequests = (friendship: Friendship) => {
    return (
      friendship?.senderId?._id?.toString() !== actualUserId && (
        <SidebarFriendsRequestsCard
          key={friendship._id.toString()}
          friendship={friendship}
        />
      )
    );
  };
  return (
    <div className="flex flex-col">
      {receivedAccepted.map((friendship) => renderRequests(friendship))}
    </div>
  );
}

export default SidebarFriendsRequestsTable;
