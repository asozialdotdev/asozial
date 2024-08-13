const getUser = async () => {
  const res = await fetch("/auth", {
    method: "GET",
  });
  if (!res) {
    console.log("User not found");
  } else {
    console.log(res.headers);
  }
};

export default getUser;
