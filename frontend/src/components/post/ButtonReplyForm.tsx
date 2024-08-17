import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

function ButtonReplyForm({
  toggleOpen,
  startOpen,
}: {
  toggleOpen: () => void;
  startOpen?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center gap-4">
      <Button
        type="submit"
        disabled={pending}
        className="my-6 bg-dark px-8 text-lg dark:bg-light hover:dark:bg-zinc-300 dark:focus:bg-zinc-300"
      >
        {pending ? "Commenting" : "Comment"}
      </Button>
      {!startOpen && (
        <Button
          type="button"
          disabled={pending}
          variant="outline"
          onClick={toggleOpen}
          className="my-6 px-8 text-lg hover:dark:bg-zinc-300 dark:focus:bg-zinc-300"
        >
          Cancel
        </Button>
      )}
    </div>
  );
}

export default ButtonReplyForm;
