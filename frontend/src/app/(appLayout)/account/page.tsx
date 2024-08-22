import { notFound } from "next/navigation";
import PageContainer from "@/components/common/PageContainer";
import getUserByUsername from "@/actions/getUserByUsername.server";
import UserComponent from "@/components/user/UserComponent";
import { auth } from "@/auth";
import UserLoading from "@/components/user/UserLoading";

async function AccountPage() {
  const session = await auth();
  if (!session) {
    notFound();
  }

  const user = await getUserByUsername({
    username: session?.user?.githubUsername ?? "",
  });
  if (!user) {
    notFound();
  }

  return (
    <PageContainer className="gap-8">
      {user ? <UserComponent user={user} /> : <UserLoading />}
    </PageContainer>
  );
}

export default AccountPage;
