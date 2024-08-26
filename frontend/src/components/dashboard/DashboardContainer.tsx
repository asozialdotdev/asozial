import PageContainer from "../common/containers/PageContainer";
import PageTitle from "../common/ui/PageTitle";
import DashboardComponent from "./DashboardComponent";

async function DashboardContainer() {
  return (
    <PageContainer>
      <PageTitle>Dashboard</PageTitle>
      <DashboardComponent />
    </PageContainer>
  );
}

export default DashboardContainer;
