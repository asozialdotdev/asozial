import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

function ReplyFormButton({
  toggleOpen,
  startOpen,
  edit,
}: {
  toggleOpen?: () => void;
  startOpen: boolean;
  edit: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="flex w-full min-w-fit items-center gap-4">
      {!edit ? (
        <Button
          type="submit"
          disabled={pending}
          className={`${startOpen ? "my-6 w-[150px] px-8 text-lg" : "w-[100px] px-4 text-sm"} bg-dark dark:bg-light hover:dark:bg-zinc-300 dark:focus:bg-zinc-300`}
        >
          {pending ? "Commenting" : "Comment"}
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={pending}
          className={`${startOpen ? "my-6 w-[150px] px-8 text-lg" : "w-[100px] px-4 text-sm"} bg-dark dark:bg-light hover:dark:bg-zinc-300 dark:focus:bg-zinc-300`}
        >
          {pending ? "Updating" : "Update"}
        </Button>
      )}
      {!startOpen && (
        <Button
          type="button"
          disabled={pending}
          variant="outline"
          onClick={toggleOpen}
          className="min-w-[85px] text-sm hover:dark:bg-zinc-300 dark:focus:bg-zinc-300"
        >
          Cancel
        </Button>
      )}
    </div>
  );
}

export default ReplyFormButton;
