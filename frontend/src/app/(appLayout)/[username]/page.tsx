import { getUserFriendStatuses } from "@/actions";
import { getUserByUsername } from "@/actions/users.server/getUserByUsername.server";
import PageContainer from "@/components/common/containers/PageContainer";
import UserComponent from "@/components/user/UserComponent";

async function Page({ params }: { params: { username: string } }) {
  const { username } = params;
  const [result, friends] = await Promise.all([
    getUserByUsername(username),
    getUserFriendStatuses(),
  ]);
  const { accepted } = friends;
  console.log("friends accepted >>>>>>>>>>", accepted);
  return (
    <PageContainer>
      <UserComponent result={result} friends={accepted} />
    </PageContainer>
  );
}

export default Page;
