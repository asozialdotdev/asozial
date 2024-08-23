import getUserByUsername from "@/actions/getUserByUsername.server";
import PageContainer from "@/components/common/PageContainer";
import UserComponent from "@/components/user/UserComponent";

async function Page({ params }: { params: { username: string } }) {
  const user = await getUserByUsername(params.username);
  return (
    <PageContainer>
      <UserComponent user={user} />
    </PageContainer>
  );
}

export default Page;
