import { auth } from "@/auth";
import DashboardContainer from "@/components/dashboard/DashboardContainer";

async function Page() {
  const session = await auth();
  console.log("session:", session);
  if (!session) {
    return <div>must be logged in</div>;
  }
  return (
    <>
      <DashboardContainer />
    </>
  );
}

export default Page;
