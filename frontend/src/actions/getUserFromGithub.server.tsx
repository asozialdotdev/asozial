async function getUserFromGithub(githubCode: string) {
  try {
    const data = {
      code: githubCode,
    };
    const response = await fetch("http://localhost:5005/verify", {
      headers: {
        Authorization: `Bearer ${githubCode}`,
      },
      method: "GET",
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Failed to authenticate with GitHub");
    console.log(error);
  }
}

export default getUserFromGithub;
