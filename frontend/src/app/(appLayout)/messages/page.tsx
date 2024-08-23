import { auth } from "@/auth";

import { Button } from "@/components/ui/button";
import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import sendMessage from "@/actions/message.server/sendMessage";

async function MessagePage() {
  const session = await auth();
  const user = session?.user.id;
  const message = "";
  return (
    <PageContainer>
      <PageTitle>Message</PageTitle>
      <MessageBody /> {/* this must be a client component */}
      <Button to={`/messages/${user}`}>Send Message</Button>
    </PageContainer>
  );
}
