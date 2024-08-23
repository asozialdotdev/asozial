import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import LoadingTextButton from "../common/ui/LoadingTextButton";

function SyncRepoButton() {
  const { pending } = useFormStatus();

  return (
    <div>
      <Button
        type="submit"
        disabled={pending}
        className="my-6 bg-dark px-8 text-lg dark:bg-light hover:dark:bg-zinc-300 dark:focus:bg-zinc-300"
      >
        {pending ? <LoadingTextButton text="Syncing" /> : "Sync"}
      </Button>
    </div>
  );
}

export default SyncRepoButton;
