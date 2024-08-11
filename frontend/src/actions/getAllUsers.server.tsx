const getAllUsers = async () => {
  "use server";
  const users = await fetch("/users/search", {
    method: "GET",
  });
  if (!users) {
    console.log("Users not found");
  } else {
    return users;
  }
};

export default getAllUsers;
