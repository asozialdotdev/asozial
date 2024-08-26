import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import LoadingTextButton from "../common/ui/LoadingTextButton";
import { SquareX } from "lucide-react";
type DeclineButtonProps = {
  error: string[] | undefined;
};

function DeclineButton({ error }: DeclineButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button variant="secondary" size="sm" className="">
      {pending ? (
        <LoadingTextButton />
      ) : error ? (
        <span className="flex items-center text-red-700 dark:text-red-700">
          <SquareX size={15} /> Error
        </span>
      ) : (
        "Decline"
      )}
    </Button>
  );
}

export default DeclineButton;
