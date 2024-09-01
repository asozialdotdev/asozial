import type { Friendship, ConversationFriend } from "@/types/Friendship";
import PageCard from "../common/containers/PageCard";
import Link from "next/link";
import UserAvatar from "../common/ui/image/UserAvatar";
import { getUserFriendStatuses } from "@/actions";
import { auth } from "@/auth";
import { formatDistanceToNow } from "date-fns";

async function ConversationList() {
  const { accepted } = await getUserFriendStatuses();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <PageCard className="flex w-full flex-col">No Conversations</PageCard>
    );
  }
  return (
    <>
      {accepted &&
        accepted
          .sort((a: any, b: any) => {
            const aHasMostRecentMessage = a.mostRecentMessage ? true : false;
            const bHasMostRecentMessage = b.mostRecentMessage ? true : false;

            if (aHasMostRecentMessage && bHasMostRecentMessage) {
              return (
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
              );
            }

            if (aHasMostRecentMessage) return -1;
            if (bHasMostRecentMessage) return 1;

            if (a.updatedAt && b.updatedAt) {
              return (
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
              );
            }

            if (a.updatedAt) return -1;
            if (b.updatedAt) return 1;

            return 0;
          })
          .map((conversation: Friendship) => {
            const friend = conversation?.friends?.find(
              (friend): friend is ConversationFriend =>
                friend._id.toString() !== userId.toString(),
            );
            return (
              <PageCard
                key={conversation._id.toString()}
                className="flex w-full flex-col"
              >
                <Link
                  href={`/messages/${conversation._id}`}
                  className="flex flex-col gap-10"
                >
                  <div className="flex flex-row items-center gap-6">
                    {friend && (
                      <div className="flex w-full flex-col gap-6">
                        <div className="flex flex-row items-center justify-between gap-4">
                          <div className="flex flex-row items-center gap-4">
                            <UserAvatar
                              src={friend?.info?.image}
                              username={friend?.username}
                            />
                            <h1 className="text-lg">{friend.username}</h1>
                          </div>
                          <p>
                            Friends since:{" "}
                            {conversation.createdAt &&
                              (() => {
                                const createdAtDate = new Date(
                                  conversation.createdAt,
                                );
                                const currentYear = new Date().getFullYear();
                                const createdAtYear =
                                  createdAtDate.getFullYear();

                                if (createdAtYear === currentYear) {
                                  return createdAtDate.toLocaleDateString(
                                    undefined,
                                    {
                                      month: "long",
                                      day: "numeric",
                                    },
                                  );
                                } else {
                                  return createdAtDate.toLocaleDateString(
                                    undefined,
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    },
                                  );
                                }
                              })()}
                          </p>
                        </div>
                        <div className="flex w-full flex-row">
                          {conversation.mostRecentMessage?.createdAt ? (
                            <div className="flex w-full flex-row items-center justify-between">
                              <div className="flex w-3/4 flex-row items-center gap-4">
                                <p>
                                  {conversation.mostRecentMessage.senderId.toString() ===
                                  userId
                                    ? "You: "
                                    : "Them:"}
                                </p>
                                <p className="flex flex-wrap overflow-hidden break-words text-lg">
                                  {conversation.mostRecentMessage.content}
                                </p>
                              </div>

                              <p className="">
                                {formatDistanceToNow(
                                  new Date(
                                    conversation?.mostRecentMessage?.createdAt,
                                  ),
                                )}{" "}
                                ago
                              </p>
                            </div>
                          ) : (
                            <p className="text-lg">
                              Don&#39;t be so{" "}
                              <strong className="text-xl">asozial!</strong> say
                              &#39;Hello, world!&#39;
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </PageCard>
            );
          })}
    </>
  );
}

export default ConversationList;
