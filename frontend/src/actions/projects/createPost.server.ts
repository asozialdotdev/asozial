"use server";
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5005";
import { revalidatePath } from "next/cache";
const createPost = async (formData: FormData) => {
  const title = formData.get("title");
  const content = formData.get("content");
  const projectId = formData.get("projectId");
  console.log("Creating post:", { title, content, projectId });

  try {
    const response = await fetch(`${baseUrl}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        projectId,
        userId: "66ba4cb189ed3084ede59fa5"
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }
    const post = await response.json();
    console.log("Created post:", post);
    const projectPath = `/projects/${projectId}`;
    revalidatePath(projectPath);
    return post;
  } catch (error) {
    console.error("Error creating postttttttt:", error);
    return "Error creating post";
  }
};

export { createPost };
