import { Member, Project } from "@/types/Project";
import { useRequests } from "@/context/RequestsContext";
import SidebarProjectRequestsCard from "./SidebarProjectRequestsCard";
import SidebarCardSkeleton from "./SidebarCardSkeleton";
import ErrorMessage from "../ui/ErrorMessage";
import Friendship from "@/types/Friendship";

function SidebarFriendsRequestsTable() {
  const { friendsRequests, friendsError, friendsLoading } = useRequests();
  console.log("FriendssRequests", friendsRequests);

  if (friendsLoading) {
    return (
      <>
        <SidebarCardSkeleton />
        <SidebarCardSkeleton />
        <SidebarCardSkeleton />
      </>
    );
  }

  if (friendsError) {
    return <ErrorMessage>{friendsError}</ErrorMessage>;
  }

  if (friendsRequests.length === 0 || !friendsRequests) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        No requests yet
      </p>
    );
  }

  const renderRequests = (friend: Friendship) => {
    return (
      // <SidebarProjectRequestsCard
      //   key={`${project._id.toString()}-${member._id.toString()}`}
      //   member={member}
      //   project={project}
      // />
      <div>
        <p>{friend.senderId?.info.username} wants to be your friend</p>
        <button>Accept</button>
        <button>Decline</button>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {friendsRequests.map((friend) => renderRequests(friend))}
    </div>
  );
}

export default SidebarFriendsRequestsTable;
