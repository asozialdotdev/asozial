import Footer from "@/components/common/layout/Footer";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/common/containers/PageContainer";
import { auth } from "@/auth";
import { signIn } from "@/actions";
import bearlogo from "/public/bearlogo.jpg";
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
            <Button className="flex gap-3 px-8" type="submit">
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
