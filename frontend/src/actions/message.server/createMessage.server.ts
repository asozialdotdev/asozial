"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { createMessageSchema } from "@/lib/schema";
import { FriendshipId } from "@/types/Friendship";
import { revalidatePath } from "next/cache";

export type CreateMessageFormState = {
  errors: {
    content?: string[];
  };
  success?: boolean;
};

const createMessage = async (
  friendshipId: FriendshipId,
  formState: CreateMessageFormState,
  formData: FormData,
): Promise<CreateMessageFormState> => {
  const session = await auth();
  const result = createMessageSchema.safeParse({
    content: formData.get("content"),
  });
  if (!result.success) {
    console.error("Validation error:", result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${baseUrl}/api/messages/${friendshipId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: session?.user.id,
        content: result.data.content,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }

    const message = await response.json();
    revalidatePath(`/messages/${friendshipId}`);
    return { errors: {}, success: true };
  } catch (error) {
    console.error("Error creating message:", error);
    return { errors: { content: ["Failed to create message"] } };
  }
};

export { createMessage };
