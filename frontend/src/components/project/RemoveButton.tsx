import { Button } from "../ui/button";
import LoadingTextButton from "../common/ui/loading/LoadingTextButton";
import { useFormStatus } from "react-dom";

function RemoveButton({ success }: { success: boolean | undefined }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending || success} variant="secondary">
      {pending ? (
        <LoadingTextButton />
      ) : success ? (
        <span className="flex items-center gap-1">
          <p>Removed</p>
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <p>Remove Member</p>
        </span>
      )}
    </Button>
  );
}

export default RemoveButton;
