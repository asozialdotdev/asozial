import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import DashboardComponent from "@/components/dashboard/DashboardComponent";

async function Page() {
  return (
    <PageContainer>
      <PageTitle>Dashboard</PageTitle>
      <DashboardComponent />
    </PageContainer>
  );
}

export default Page;
