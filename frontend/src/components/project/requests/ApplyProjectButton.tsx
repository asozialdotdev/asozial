import { useFormStatus } from "react-dom";
import { SquareCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingTextButton from "@/components/common/ui/LoadingTextButton";

function ApplyProjectButton({ hasApplied }: { hasApplied: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={hasApplied} className="text-lg" type="submit">
      {pending ? (
        <LoadingTextButton text="Applying" />
      ) : !hasApplied ? (
        "Apply to join this project"
      ) : (
        <span className="flex items-center gap-2">
          <SquareCheck />
          <span>You have applied!</span>
        </span>
      )}
    </Button>
  );
}

export default ApplyProjectButton;
