import { CircleUserRound } from "lucide-react";
import UserAvatar from "../common/ui/image/UserAvatar";
import { User, UserId } from "@/types/User";
import { Friendship } from "@/types/Friendship";
import Link from "next/link";

type UserFriendsProps = {
  user: User;
  actualUserId?: UserId;
  friends: Friendship[];
};

function UserFriends({ user, actualUserId, friends }: UserFriendsProps) {
  const actualUserReceivedAccepted = friends.filter(
    (friendship: Friendship) => {
      return friendship.receiverId?._id === actualUserId;
    },
  );

  const actualUserSentAccepted = friends.filter((friendship: Friendship) => {
    return friendship.senderId?._id === actualUserId;
  });

  const receivedAccepted = friends.filter((friendship: Friendship) => {
    return friendship.receiverId?._id === user._id;
  });
  const sentAccepted = friends.filter((friendship: Friendship) => {
    return friendship.senderId?._id === user._id;
  });

  const isActualUser = actualUserId === user._id;
  console.log("isActualUser", isActualUser);

  return (
    <div className="flex flex-col gap-4">
      <Link href={`${user.info.username}/friends`}>
        <h3 className="flex flex-wrap gap-4 font-semibold hover:opacity-75">
          <CircleUserRound size={24} />
          Friends (
          {isActualUser
            ? actualUserReceivedAccepted.length + actualUserSentAccepted.length
            : receivedAccepted.length + sentAccepted.length}
          )
        </h3>
      </Link>
      {/* Display friends of the actual user */}
      {actualUserId === user._id ? (
        <div className="flex flex-wrap gap-4">
          {actualUserReceivedAccepted.map((friendship) => (
            <UserAvatar
              key={
                friendship?.senderId?._id?.toString() === actualUserId
                  ? friendship?.receiverId?._id.toString()
                  : friendship?.senderId?._id.toString()
              }
              userId={
                friendship?.senderId?._id.toString() === actualUserId
                  ? friendship?.receiverId?._id.toString()
                  : friendship?.senderId?._id.toString()
              }
              username={
                friendship?.senderId?.username === actualUserId
                  ? friendship?.receiverId?.username
                  : friendship?.senderId?.username
              }
              src={
                friendship?.senderId?.info?.image === actualUserId
                  ? friendship?.receiverId?.info?.image
                  : friendship?.senderId?.info?.image
              }
            />
          ))}

          {actualUserSentAccepted.map((friendship) => (
            <UserAvatar
              key={
                friendship?.senderId?._id?.toString() !== actualUserId
                  ? friendship?.receiverId?._id.toString()
                  : friendship?.senderId?._id.toString()
              }
              userId={
                friendship?.senderId?._id.toString() !== actualUserId
                  ? friendship?.receiverId?._id.toString()
                  : friendship?.senderId?._id.toString()
              }
              username={
                friendship?.senderId?.username !== actualUserId
                  ? friendship?.receiverId?.username
                  : friendship?.senderId?.username
              }
              src={
                friendship?.senderId?.info?.image !== actualUserId
                  ? friendship?.receiverId?.info?.image
                  : friendship?.senderId?.info?.image
              }
            />
          ))}
        </div>
      ) : (
        // Display friends of the visited user
        <div className="flex flex-wrap gap-4">
          {receivedAccepted.map((friendship) => {
            const friendId =
              friendship?.senderId?._id.toString() === actualUserId
                ? friendship?.receiverId?._id.toString()
                : friendship?.senderId?._id.toString();

            // Display friends of the visited user, excluding the actual user
            return (
              <UserAvatar
                key={friendId}
                userId={friendId}
                username={
                  friendship?.senderId?._id.toString() === user._id.toString()
                    ? friendship?.receiverId?.username
                    : friendship?.senderId?.username
                }
                src={
                  friendship?.senderId?._id.toString() === user._id.toString()
                    ? friendship?.receiverId?.info?.image
                    : friendship?.senderId?.info?.image
                }
              />
            );
          })}

          {sentAccepted.map((friendship) => {
            const friendId =
              friendship?.receiverId?._id.toString() === actualUserId
                ? friendship?.senderId?._id.toString()
                : friendship?.receiverId?._id.toString();

            return (
              <UserAvatar
                key={friendId}
                userId={friendId}
                username={
                  friendship?.receiverId?._id.toString() === user._id.toString()
                    ? friendship?.senderId?.username
                    : friendship?.receiverId?.username
                }
                src={
                  friendship?.receiverId?._id.toString() === user._id.toString()
                    ? friendship?.senderId?.info?.image
                    : friendship?.receiverId?.info?.image
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserFriends;
