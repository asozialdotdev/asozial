import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageContainer from "@/components/common/PageContainer";

import { auth } from "@/auth";
import { signIn, signOut } from "@/actions/auth.server";
import { AvatarImage } from "@radix-ui/react-avatar";
import bearlogo from "/public/bearlogo.webp";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

async function LandingPage() {
  const session = await auth();
  return (
    <>
      <PageContainer>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-7xl">asozial</h1>

          <Image width={450} height={450} src={bearlogo} alt="bear-logo" />
          <form action={signIn}>
            <Button className="px-8 flex gap-3" type="submit">
              {session?.user ? "Enter" : "Sign In"}
              <FaGithub size={24} />

            </Button>
          </form>

          <div>
            {session?.user ? (
              <div>You are logged in</div>
            ) : (
              <div>Sign in to continue</div>
            )}
          </div>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}

export default LandingPage;
