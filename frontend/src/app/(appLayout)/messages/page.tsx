import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import { getUserFriendStatuses } from "@/actions";
import Link from "next/link";
import PageCard from "@/components/common/containers/PageCard";
import { auth } from "@/auth";
import UserAvatar from "@/components/common/ui/image/UserAvatar";

async function MessagePage() {
  const { accepted } = await getUserFriendStatuses();
  const session = await auth();
  const userId = session?.user.id;
  return (
    <PageContainer>
      <PageTitle>Messages</PageTitle>
      {accepted &&
        accepted.map((friendship: any) => {
          const friend = friendship.friends.filter(
            (friend: any) => friend._id !== userId,
          )[0];
          return (
            <PageCard key={friendship._id} className="flex w-full flex-col">
              <Link
                href={`/messages/${friendship._id}`}
                className="flex flex-col gap-10"
              >
                <div className="flex flex-row items-center gap-6">
                  {friend && (
                    <>
                      <UserAvatar
                        src={friend?.info?.image}
                        username={friend?.username}
                      />
                      <h1 className="text-lg">{friend.username}</h1>
                    </>
                  )}
                </div>
              </Link>
            </PageCard>
          );
        })}
    </PageContainer>
  );
}

export default MessagePage;
