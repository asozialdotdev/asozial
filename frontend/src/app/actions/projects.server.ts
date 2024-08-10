"use server";

const handleJoinProject = async (formData: FormData) => {
  const projectId = formData.get("projectId") as string;

  const response = await fetch(`http://localhost:5005/projects/${projectId}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: "60d4f4d2d243f80015f7b3f9" }),
  });

  const result = await response.json();
  console.log("result:", result);
};

export { handleJoinProject };
