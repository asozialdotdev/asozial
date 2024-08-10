const getUser = async () => {
  const res = await fetch("/auth", {
    method: "POST",
  });
  if (!res) {
    console.log("User not found");
  } else {
    console.log(res.headers);
  }
};

export default getUser;
