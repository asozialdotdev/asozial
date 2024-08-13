import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

function NewProjectForm() {
  return (
    <div className="mt-4 w-full">
      <h2 className="text-xl font-semibold">Create a new project</h2>
      <form className="mt-2 flex w-full flex-col gap-2">
        <div>
          <label htmlFor="title" className="text-sm font-light">
            Title
          </label>
          <Input type="text" name="title" placeholder="Title" />
        </div>

        <div>
          <label className='font-light" text-sm' htmlFor="description">
            Description
          </label>
          <Input type="text" name="title" placeholder="Title" />
        </div>

        <div>
          <label className="text-sm font-light" htmlFor="pitch">
            Pitch
          </label>
          <Textarea
            name="pitch"
            placeholder="Describe what is your project about and why other members should join it..."
            className="w-full"
          />
        </div>

        <Button className="my-2 bg-dark dark:bg-light">Create</Button>
      </form>
    </div>
  );
}

export default NewProjectForm;
