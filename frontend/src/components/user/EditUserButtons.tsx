import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import LoadingTextButton from "../common/ui/loading/LoadingTextButton";

type EditUserButtonsProps = {
  toggleEdit: () => void;
};

function EditUserButtons({ toggleEdit }: EditUserButtonsProps) {
  const { pending } = useFormStatus();

  return (
    <div className="flex gap-4 self-end">
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? <LoadingTextButton text="Saving" /> : "Save"}
      </Button>
      <Button
        size="sm"
        variant="secondary"
        disabled={pending}
        onClick={toggleEdit}
        className="flex items-center gap-2"
      >
        <p>Cancel</p>
      </Button>
    </div>
  );
}

export default EditUserButtons;
