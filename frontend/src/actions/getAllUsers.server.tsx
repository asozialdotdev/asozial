const getAllUsers = async () => {
  "use server";
  const data = await fetch("/users/search", {
    method: "GET",
  });
  if (!data) {
    console.log("Users not found");
  } else {
    const users = await data.json();
    return users;
  }
};

export default getAllUsers;
