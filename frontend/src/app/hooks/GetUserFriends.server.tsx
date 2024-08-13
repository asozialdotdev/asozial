import { User } from "@/types/User";

import { useUserContext } from "@/context/UserContext";

const GetUserFriends = async () => {
  const { user } = useUserContext();
  ("use server");
  const friends = await fetch(`/users/`, {
    method: "GET",
  });
  if (!friends) {
    console.log("Friends not found");
  } else {
    return friends;
  }
};
