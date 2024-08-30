import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardFriendItem from "./FriendshipItem";
import { Friendship } from "@/types/Friendship";

function FriendshipSentCard({ sentPending }: { sentPending: Friendship[] }) {
  return (
    <>
      {sentPending && sentPending.length > 0 ? (
        sentPending.map(
          (friendship: Friendship) =>
            friendship !== null && (
              <Card
                key={friendship.receiverId?._id.toString()}
                className="relative mb-4 w-full border-dashed border-zinc-300 bg-inherit bg-zinc-100 p-4 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10"
              >
                <DashboardFriendItem
                  key={friendship.receiverId?._id.toString()}
                  friendshipId={friendship._id}
                  userId={friendship.receiverId?._id.toString()}
                  username={friendship.receiverId?.username}
                  image={friendship.receiverId?.info.image}
                  status="sent"
                />
              </Card>
            ),
        )
      ) : (
        <p className="text-center text-sm text-neutral-500">
          No sent friend requests yet
        </p>
      )}
    </>
  );
}

export default FriendshipSentCard;
