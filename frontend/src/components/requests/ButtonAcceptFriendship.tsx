import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

import { SquareCheck } from "lucide-react";
import LoadingTextButton from "../common/ui/loading/LoadingTextButton";

type AcceptButtonProps = {
  acceptSuccess: boolean | undefined;
  sidebar?: boolean;
};
function ButtonAcceptFriendship({ acceptSuccess, sidebar }: AcceptButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || acceptSuccess}
      className={sidebar ? "h-6 w-auto text-xs" : "text-sm"}
      size="sm"
    >
      {pending ? (
        <LoadingTextButton />
      ) : acceptSuccess ? (
        <span className="flex items-center gap-1">
          <SquareCheck size={sidebar ? 14 : 18} />
          <p>Accepted</p>
        </span>
      ) : (
        "Accept"
      )}
    </Button>
  );
}

export default ButtonAcceptFriendship;
