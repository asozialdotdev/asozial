import { FileOutput, SquareCheck } from "lucide-react";
import { useFormStatus } from "react-dom";
import LoadingTextButton from "@/components/common/ui/loading/LoadingTextButton";
import { Button } from "@/components/ui/button";

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
