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
            console.log(conversation?.messages?.length);
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
                        <div className="flex w-full flex-row justify-between">
                          {conversation?.messages && (
                            <p className="text-xl">
                              {conversation.messages.length > 0
                                ? conversation.messages.length
                                : "asozial! say 'Hello, world!'"}
                            </p>
                          )}
                          {conversation?.updatedAt &&
                            conversation?.createdAt &&
                            conversation?.messages &&
                            conversation?.messages.length > 0 && (
                              <div className="flex flex-col gap-4">
                                Last message:{" "}
                                {formatDistanceToNow(
                                  new Date(conversation.updatedAt),
                                )}{" "}
                                ago
                              </div>
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
