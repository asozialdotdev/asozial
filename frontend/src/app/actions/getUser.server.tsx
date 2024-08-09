const getUser = async () => {
  const foundUser = await fetch("/auth", {
    method: "POST",
  });
  if (!foundUser) {
    console.log("User not found");
  } else {
    console.log(foundUser);
  }
};

export default getUser;
