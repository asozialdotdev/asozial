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

  const visitedUserReceivedAccepted = friends.filter(
    (friendship: Friendship) => {
      return friendship.receiverId?._id === user._id;
    },
  );
  const visitedUserSentAccepted = friends.filter((friendship: Friendship) => {
    return friendship.senderId?._id === user._id;
  });

  const isActualUser = actualUserId === user._id;

  return (
    <div className="flex flex-col gap-4">
      <Link href={`${user.info.username}/friends`}>
        <h3 className="flex flex-wrap gap-4 font-semibold hover:opacity-75">
          <CircleUserRound size={24} />
          Friends (
          {isActualUser
            ? actualUserReceivedAccepted.length + actualUserSentAccepted.length
            : visitedUserReceivedAccepted.length +
              visitedUserSentAccepted.length}
          )
        </h3>
      </Link>
      {/* Display friends of the actual user */}
      {isActualUser ? (
        <div className="flex flex-wrap gap-4">
          {actualUserReceivedAccepted.map((friendship) => {
            const actualUserIsSender =
              friendship?.senderId?._id?.toString() === actualUserId;
            return (
              <UserAvatar
                key={
                  actualUserIsSender
                    ? friendship?.receiverId?._id.toString()
                    : friendship?.senderId?._id.toString()
                }
                userId={
                  actualUserIsSender
                    ? friendship?.receiverId?._id.toString()
                    : friendship?.senderId?._id.toString()
                }
                username={
                  actualUserIsSender
                    ? friendship?.receiverId?.username
                    : friendship?.senderId?.username
                }
                src={
                  actualUserIsSender
                    ? friendship?.receiverId?.info?.image
                    : friendship?.senderId?.info?.image
                }
              />
            );
          })}

          {actualUserSentAccepted.map((friendship) => {
            const actualUserIsReceiver =
              friendship?.receiverId?._id?.toString() === actualUserId;
            return (
              <UserAvatar
                key={
                  actualUserIsReceiver
                    ? friendship?.senderId?._id.toString()
                    : friendship?.receiverId?._id.toString()
                }
                userId={
                  actualUserIsReceiver
                    ? friendship?.senderId?._id.toString()
                    : friendship?.receiverId?._id.toString()
                }
                username={
                  actualUserIsReceiver
                    ? friendship?.senderId?.username
                    : friendship?.receiverId?.username
                }
                src={
                  actualUserIsReceiver
                    ? friendship?.senderId?.info?.image
                    : friendship?.receiverId?.info?.image
                }
              />
            );
          })}
        </div>
      ) : (
        // Display friends of the visited user
        <div className="flex flex-wrap gap-4">
          {visitedUserReceivedAccepted.map((friendship) => {
            const userIsSender =
              friendship?.senderId?._id.toString() === user._id.toString();
            return (
              <UserAvatar
                key={
                  userIsSender
                    ? friendship?.receiverId?._id.toString()
                    : friendship?.senderId?._id.toString()
                }
                userId={
                  userIsSender
                    ? friendship?.receiverId?._id.toString()
                    : friendship?.senderId?._id.toString()
                }
                username={
                  userIsSender
                    ? friendship?.receiverId?.username
                    : friendship?.senderId?.username
                }
                src={
                  userIsSender
                    ? friendship?.receiverId?.info?.image
                    : friendship?.senderId?.info?.image
                }
              />
            );
          })}

          {visitedUserSentAccepted.map((friendship) => {
            const userIsReceiver =
              friendship?.receiverId?._id.toString() === user._id.toString();

            return (
              <UserAvatar
                key={
                  userIsReceiver
                    ? friendship?.senderId?.username
                    : friendship?.receiverId?.username
                }
                userId={
                  userIsReceiver
                    ? friendship?.senderId?.username
                    : friendship?.receiverId?.username
                }
                username={
                  userIsReceiver
                    ? friendship?.senderId?.username
                    : friendship?.receiverId?.username
                }
                src={
                  userIsReceiver
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
