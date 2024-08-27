import LoadingTextButton from "@/components/common/ui/loading/LoadingTextButton";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

function RestoreButton({ success }: { success: boolean | undefined }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending || success}>
      {pending ? (
        <LoadingTextButton />
      ) : success ? (
        <span className="flex items-center gap-1">
          <p>Restored</p>
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <p>Restore Member</p>
        </span>
      )}
    </Button>
  );
}

export default RestoreButton;
