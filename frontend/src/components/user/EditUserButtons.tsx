import { Button } from "../ui/button";

type EditUserButtonsProps = {
  toggleEdit: () => void;
};

function EditUserButtons({ toggleEdit }: EditUserButtonsProps) {
  return (
    <div className="flex gap-4 self-end">
      <Button size="sm">
        <p>Save</p>
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={toggleEdit}
        className="flex items-center gap-2"
      >
        <p>Cancel</p>
      </Button>
    </div>
  );
}

export default EditUserButtons;
