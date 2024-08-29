import { User } from "@/types/User";

import { Input } from "../ui/input";
import EditUserButtons from "./EditUserButtons";
import CustomLabel from "../common/ui/Label";
import { useFormState } from "react-dom";
import { updateUserInfo } from "@/actions/users.server";

type EditUserFormProps = {
  toggleEdit: () => void;
  user: User;
};

function EditUserForm({ toggleEdit, user }: EditUserFormProps) {
  const [formState, action] = useFormState(updateUserInfo, {
    errors: {},
  });

  const success = formState.success;
  const errors = formState.errors;
  return (
    <>
      <form className="flex h-auto w-full flex-col gap-6">
        <div className="flex flex-col justify-around gap-4 lg:flex-row">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-8">
              <div className="flex w-full flex-col">
                <CustomLabel htmlFor="website">Website</CustomLabel>
                <Input
                  type="text"
                  name="website"
                  defaultValue={user.info.website || ""}
                  placeholder="https://yourwebsite.com"
                  className="w-full max-w-md lg:w-[15rem]"
                />
              </div>
            </div>
            <div className="flex w-full flex-col">
              <CustomLabel htmlFor="email">Email</CustomLabel>

              <Input
                type="text"
                name="email"
                defaultValue={user.info.email || ""}
                placeholder="you@areawesome.com"
                className="w-full max-w-md lg:w-[15rem]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex w-full flex-col">
              <CustomLabel htmlFor="company">Company</CustomLabel>

              <Input
                type="text"
                name="company"
                defaultValue={user.info.company || ""}
                placeholder="Where do you work?"
                className="w-full max-w-md lg:w-[15rem]"
              />
            </div>

            <div className="flex w-full flex-col">
              <CustomLabel htmlFor="location">Location</CustomLabel>

              <Input
                type="text"
                name="location"
                defaultValue={user.info.location || ""}
                placeholder="Location"
                className="w-full max-w-md lg:w-[15rem]"
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="text-md flex w-full flex-row gap-8">
          <div className="flex w-full flex-col lg:items-center">
            <CustomLabel
              className="left-0 top-0 lg:-translate-x-[13rem]"
              htmlFor="bio"
            >
              Bio
            </CustomLabel>
            <Input
              type="text"
              name="bio"
              defaultValue={user.github.bio || ""}
              placeholder="Bio"
              className="w-full max-w-md"
            />
          </div>
        </div>
        <EditUserButtons toggleEdit={toggleEdit} />
      </form>
    </>
  );
}

export default EditUserForm;
