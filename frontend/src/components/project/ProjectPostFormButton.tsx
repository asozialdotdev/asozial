"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

function ProjectPostFormButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  console.log("pending:", pending);
  return (
    <>
      <Button
        type="submit"
        disabled={pending}
        className="my-6 bg-dark px-8 text-lg dark:bg-light hover:dark:bg-zinc-300 dark:focus:bg-zinc-300"
      >
        {!editing
          ? pending
            ? "Posting"
            : "Post"
          : pending
            ? "Updating"
            : "Update"}
      </Button>
    </>
  );
}

export default ProjectPostFormButton;
