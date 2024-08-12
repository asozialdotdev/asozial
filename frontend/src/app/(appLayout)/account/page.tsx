import PageCard from "@/components/common/PageCard";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";

function Page() {
  return (
    <PageContainer className="gap-8">
      <PageTitle>Account</PageTitle>
      <PageCard>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit non
        provident, dolore magnam totam quis necessitatibus dolorum harum
        dignissimos laboriosam.
      </PageCard>
      <PageCard>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa,
        pariatur.
      </PageCard>
    </PageContainer>
  );
}

export default Page;
