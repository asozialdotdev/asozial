import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { SquareCheck } from "lucide-react";
import LoadingTextButton from "../common/ui/loading/LoadingTextButton";

type AcceptButtonProps = {
  acceptSuccess: boolean | undefined;
};
function AcceptButtons({ acceptSuccess }: AcceptButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending || acceptSuccess} size="sm">
      {pending ? (
        <LoadingTextButton />
      ) : acceptSuccess ? (
        <span className="flex items-center gap-1">
          <SquareCheck size={18} />
          <p>Accepted</p>
        </span>
      ) : (
        "Accept"
      )}
    </Button>
  );
}

export default AcceptButtons;
