import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import LoadingTextButton from "../common/ui/LoadingTextButton";
import { SquareX } from "lucide-react";

type AcceptButtonProps = {
  error: string[] | undefined;
};
function AcceptButtons({ error }: AcceptButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button size="sm" className=''>
      {" "}
      {pending ? (
        <LoadingTextButton />
      ) : error ? (
        <span className="flex items-center text-red-300 dark:text-red-300 gap-1">
          <SquareX size={15} /> Error
        </span>
      ) : (
        "Accept "
      )}
    </Button>
  );
}

export default AcceptButtons;
