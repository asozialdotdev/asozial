import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageContainer from "@/components/common/PageContainer";

import { auth } from "@/auth";
import { signIn, signInWithRedirect, signOut } from "@/actions/auth.server";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

async function LandingPage() {
  const session = await auth();
  return (
    <>
      <PageContainer className="my-auto gap-10">
        <h1>This is the Landing Page</h1>
        <Avatar className="flex-shrink-0">
          <AvatarImage src={session?.user?.image || ""} alt="User Avatar" />
          <AvatarFallback>
            {session?.user?.name?.toString().charAt(0)}
          </AvatarFallback>
        </Avatar>
        <form action={signIn}>
          <Button type="submit">Sign In</Button>
        </form>
        <form action={signOut}>
          <Button type="submit">Sign Out</Button>
        </form>

        <div>
          {session?.user ? (
            <div>
              Sign In
              <p>{JSON.stringify(session.user)}</p>
            </div>
          ) : (
            <div>Sign Out</div>
          )}
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}

export default LandingPage;
