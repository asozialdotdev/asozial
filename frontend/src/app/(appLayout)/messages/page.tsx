import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import { getUserFriendStatuses } from "@/actions/friendships.server/getUserFriendStatuses";
import Link from "next/link";

async function MessagePage() {
  const { accepted } = await getUserFriendStatuses();
  return (
    <PageContainer>
      <PageTitle>Message</PageTitle>
      {accepted.map((friendship: any) => {
        return (
          <Link
            href={`/messages/${friendship._id}`}
            className="flex flex-col gap-10"
          >
            {friendship.friends[0]}
            {friendship.friends[1]}
          </Link>
        );
      })}
    </PageContainer>
  );
}

export default MessagePage;
