import SignInForm from "@/components/auth/SignInForm";
import PageContainer from "@/components/common/PageContainer";
import Footer from "@/components/common/Footer";

function Page() {
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
