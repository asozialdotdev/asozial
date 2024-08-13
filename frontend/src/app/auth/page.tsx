import SignInForm from "@/components/auth/SignInForm";
import PageContainer from "@/components/common/PageContainer";
import Footer from "@/components/common/Footer";
import { cookies } from "next/headers";

function Page() {
  const cookiesStore = cookies();
  const hasCookie = cookiesStore.has("refreshToken");
  console.log(hasCookie);
  return (
    <>
      <PageContainer className="my-auto">
        <SignInForm />
      </PageContainer>
      <Footer />
    </>
  );
}

export default Page;
