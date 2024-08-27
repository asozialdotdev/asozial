import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadingTextButton from "./loading/LoadingTextButton";

type CustomDialogProps = {
  isDeleting?: boolean;
  trigger: React.ReactNode;
  title: string;
  description: string;
  handler: () => void;
  asChild?: boolean;
};

function CustomDialog({
  isDeleting,
  trigger,
  title,
  description,
  handler,
  asChild,
}: CustomDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild ? true : false}>{trigger}</DialogTrigger>
      <DialogContent className="bg-light dark:bg-dark">
        <DialogHeader>
          <DialogTitle className="text-xl text-dark dark:text-light">
            {title}
          </DialogTitle>
          <DialogDescription className="text-base text-gray-500 dark:text-gray-400">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <Button disabled={isDeleting} variant="destructive" onClick={handler}>
            {isDeleting ? <LoadingTextButton text="Deleting" /> : "Confirm"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CustomDialog;
