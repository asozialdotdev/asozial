import { User } from "@/types/User";

const getMessages = async (userId: string) => {
  const response = await fetch(`http://localhost:5005/messages/`);
  const data = await response.json();
  return data;
};

const messages = getMessages(user.id: String);

function MessageList() {
  return <ul>
    {
        messages && (
            messages.map((message: { id: number; text: string }) => (
                <li key={message.id}>{message.text}</li>
            ))
        )
    }
  </ul>;
}

export default MessageList;
