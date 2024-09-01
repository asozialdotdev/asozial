import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import ConversationList from "@/components/message/ConversationList";

function MessagePage() {
  return (
    <PageContainer>
      <PageTitle>Conversations</PageTitle>
      <ConversationList />
    </PageContainer>
  );
}

export default MessagePage;
