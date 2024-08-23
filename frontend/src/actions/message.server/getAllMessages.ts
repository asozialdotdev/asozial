"use server";
const getAllMessages = async () => {
  const data = await fetch("/api/messages/:friendshipId", {
    method: "GET",
  });
  if (!data) {
    console.log("Messages not found");
  } else {
    const users = await data.json();
    return users;
  }
};

export { getAllMessages };
