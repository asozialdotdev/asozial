import axios from "axios";

function getUserFromGithub({
  data,
  githubCode,
}: {
  data: any;
  githubCode: any;
}) {
  const req = axios.post("http://localhost:5005/auth", data, {
    headers: {
      Accept: "application/json",
    },
  });
  return req;
}

export default getUserFromGithub;
