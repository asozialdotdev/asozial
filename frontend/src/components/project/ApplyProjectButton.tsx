import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import LoadingTextButton from "../common/ui/LoadingTextButton";
import SuccessMessage from "../common/ui/SuccessMessage";
import { useSession } from "next-auth/react";
import { SquareCheck } from "lucide-react";

function ApplyProjectButton({ hasApplied }: { hasApplied: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={hasApplied} className="text-lg" type="submit">
      {pending ? (
        <LoadingTextButton text="Applying" />
      ) : !hasApplied ? (
        "Apply to join this project"
      ) : (
        <span className="items-center flex gap-2">
          <SquareCheck />
          <span>You have applied!</span>
        </span>
      )}
    </Button>
  );
}

export default ApplyProjectButton;
