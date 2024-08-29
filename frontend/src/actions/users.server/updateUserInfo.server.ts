"use server";

import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { updateUserInfoSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

type UpdateUserInfoState = {
  errors: {
    website?: string[];
    company?: string[];
    location?: string[];
    email?: string[];
    bio?: string[];
    _form?: string[];
  };

  success?: boolean;
};

const updateUserInfo = async (
  formState: UpdateUserInfoState,
  formData: FormData,
): Promise<UpdateUserInfoState> => {
  const session = await auth();
  const userId = session?.user?.id;

  const result = updateUserInfoSchema.safeParse({
    website: formData.get("website"),
    company: formData.get("company"),
    location: formData.get("location"),
    email: formData.get("email"),
    bio: formData.get("bio"),
  });

  if (!result.success) {
    console.error("Validation error:", result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${baseUrl}/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        website: result.data.website,
        company: result.data.company,
        location: result.data.location,
        email: result.data.email,
        bio: result.data.bio,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update user info: ${response.statusText}`);
    }
    const updatedUser = await response.json();
    revalidatePath(`/${updatedUser.username}`);
    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error updating user info:", error);
    if (error instanceof Error) {
      return {
        errors: {
          _form: ["Failed to update user info"],
        },
      };
    } else {
      return {
        errors: {
          email: ["Email not valid"],
        },
      };
    }
  }
};

export { updateUserInfo };
