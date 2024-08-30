import { Card } from "@/components/ui/card";
import DashboardFriendItem from "./FriendshipItem";
import { Friendship } from "@/types/Friendship";
import { UserId } from "@/types/User";

type FriendshipAcceptedCardProps = {
  sentAccepted: Friendship[];
  receivedAccepted: Friendship[];
  actualUserId?: UserId;
};

function FriendshipAcceptedCard({
  sentAccepted,
  receivedAccepted,
  actualUserId,
}: FriendshipAcceptedCardProps) {
  return (
    <>
      {/* Render Received Accepted Friendships */}
      {receivedAccepted &&
        receivedAccepted.length > 0 &&
        receivedAccepted.map(
          (friendship: Friendship) =>
            friendship !== null && (
              <Card
                key={friendship?.senderId?._id?.toString()}
                className="relative mb-4 w-full border-dashed border-zinc-300 bg-inherit bg-zinc-100 p-4 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10"
              >
                <DashboardFriendItem
                  key={
                    friendship?.senderId?._id?.toString() === actualUserId
                      ? friendship?.receiverId?._id.toString()
                      : friendship?.senderId?._id.toString()
                  }
                  friendshipId={friendship?._id}
                  userId={
                    friendship?.senderId?._id === actualUserId
                      ? friendship?.receiverId?._id
                      : friendship?.senderId?._id
                  }
                  username={
                    friendship?.senderId?.username === actualUserId
                      ? friendship?.receiverId?.username
                      : friendship?.senderId?.username
                  }
                  image={
                    friendship?.senderId?.info?.image === actualUserId
                      ? friendship?.receiverId?.info?.image
                      : friendship?.senderId?.info?.image
                  }
                  status="accepted"
                />
              </Card>
            ),
        )}

      {/* Render Sent Accepted Friendships */}
      {sentAccepted &&
        sentAccepted.length > 0 &&
        sentAccepted.map(
          (friendship: Friendship) =>
            friendship !== null && (
              <Card
                key={friendship?.senderId?._id?.toString()}
                className="relative mb-4 w-full border-dashed border-zinc-300 bg-inherit bg-zinc-100 p-4 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10 lg:max-w-[45%]"
              >
                <DashboardFriendItem
                  key={
                    friendship?.senderId?._id?.toString() !== actualUserId
                      ? friendship?.receiverId?._id.toString()
                      : friendship?.senderId?._id.toString()
                  }
                  friendshipId={friendship?._id}
                  userId={
                    friendship?.senderId?._id !== actualUserId
                      ? friendship?.receiverId?._id
                      : friendship?.senderId?._id
                  }
                  username={
                    friendship?.senderId?.username !== actualUserId
                      ? friendship?.receiverId?.username
                      : friendship?.senderId?.username
                  }
                  image={
                    friendship?.senderId?.info?.image !== actualUserId
                      ? friendship?.receiverId?.info?.image
                      : friendship?.senderId?.info?.image
                  }
                  status="accepted"
                />
              </Card>
            ),
        )}

      {(!receivedAccepted || receivedAccepted.length === 0) &&
        (!sentAccepted || sentAccepted.length === 0) && (
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            No accepted friends yet
          </p>
        )}
    </>
  );
}

export default FriendshipAcceptedCard;
