import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageContainer from "@/components/common/PageContainer";

function LandingPage() {
  return (
    <>
      <PageContainer className="my-auto gap-10">
        <h1>This is the Landing Page</h1>
        <Button>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
        <Button>
          <Link href="/auth">Continue with Github</Link>
        </Button>
      </PageContainer>
      <Footer />
    </>
  );
}

export default LandingPage;
