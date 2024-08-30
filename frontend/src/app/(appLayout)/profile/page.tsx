import { notFound } from "next/navigation";
import PageContainer from "@/components/common/containers/PageContainer";
import { getUserByUsername } from "@/actions/users.server/getUserByUsername.server";
import UserComponent from "@/components/user/UserComponent";
import { auth } from "@/auth";

async function ProfilePage() {
  const session = await auth();
  if (!session || typeof session.user.githubUsername !== "string") {
    return notFound();
  }
  const user = await getUserByUsername(session?.user.githubUsername);
  if (!user) {
    return notFound();
  }
  return (
    <PageContainer className="gap-8">
      {/* <UserComponent user={user} /> */}
    </PageContainer>
  );
}

export default ProfilePage;
