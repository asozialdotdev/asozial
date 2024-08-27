import { FileOutput, SquareCheck } from "lucide-react";
import { Button } from "../ui/button";
import LoadingTextButton from "../common/ui/loading/LoadingTextButton";
import { useFormStatus } from "react-dom";

function LeaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} variant="secondary" className="self-end">
      {pending ? (
        <LoadingTextButton />
      ) : (
        <span className="flex items-center gap-1">
          <FileOutput size={18} />
          <p>Leave this project</p>
        </span>
      )}
    </Button>
  );
}

export default LeaveButton;
