import LoadingTextButton from "@/components/common/ui/loading/LoadingTextButton";
import { Button } from "@/components/ui/button";
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
