import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { SquareCheck } from "lucide-react";
import LoadingTextButton from "../common/ui/loading/LoadingTextButton";
type DeclineButtonProps = {
  declineSuccess: boolean | undefined;
};

function DeclineButton({ declineSuccess }: DeclineButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="secondary"
      disabled={pending || declineSuccess}
      size="sm"
      className=""
    >
      {pending ? (
        <LoadingTextButton />
      ) : declineSuccess ? (
        <span className="flex items-center gap-1">
          <SquareCheck size={18} />
          <p>Declined</p>
        </span>
      ) : (
        "Decline"
      )}
    </Button>
  );
}

export default DeclineButton;
