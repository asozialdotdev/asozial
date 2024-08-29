import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

import { SquareCheck } from "lucide-react";
import LoadingTextButton from "../common/ui/loading/LoadingTextButton";
type DeclineButtonProps = {
  declineSuccess: boolean | undefined;
  sidebar?: boolean;
};

function DeclineButton({ declineSuccess, sidebar }: DeclineButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="secondary"
      disabled={pending || declineSuccess}
      size="sm"
      className={sidebar ? "h-6 w-auto text-xs" : "text-sm"}
    >
      {pending ? (
        <LoadingTextButton />
      ) : declineSuccess ? (
        <span className="flex items-center gap-1">
          <SquareCheck size={sidebar ? 14 : 18} />
          <p>Declined</p>
        </span>
      ) : (
        "Decline"
      )}
    </Button>
  );
}

export default DeclineButton;
