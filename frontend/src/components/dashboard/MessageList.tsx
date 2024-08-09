const getMessages = async () => {
  const response = await fetch(`http://localhost:5005/messages/`);
  const data = await response.json();
  console.log(data);
};

function MessageList() {
  return <div></div>;
}

export default MessageList;
