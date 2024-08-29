"use client";
import { User } from "@/types/User";

import { Input } from "../ui/input";
import EditUserButtons from "./EditUserButtons";
import CustomLabel from "../common/ui/Label";
import { updateUserInfo } from "@/actions/users.server/updateUserInfo.server";
import { useFormState } from "react-dom";
import ErrorMessage from "../common/ui/ErrorMessage";
import { useEffect, useRef } from "react";

type EditUserFormProps = {
  toggleEdit: () => void;
  user: User;
};

function EditUserForm({ toggleEdit, user }: EditUserFormProps) {
  const [formState, action] = useFormState(updateUserInfo, {
    errors: {},
  });

  const formRef = useRef<HTMLFormElement>(null);
  const success = formState.success;
  const errors = formState.errors;

  useEffect(() => {
    if (success) {
      toggleEdit();
    }
  });

  return (
    <>
      <form
        action={action}
        ref={formRef}
        className="flex h-auto w-full flex-col gap-6"
      >
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
                {errors.website && (
                  <ErrorMessage>{errors.website.join(", ")}</ErrorMessage>
                )}
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
              {errors.email && (
                <ErrorMessage>{errors.email.join(", ")}</ErrorMessage>
              )}
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
              {errors.company && (
                <ErrorMessage>{errors.company.join(", ")}</ErrorMessage>
              )}
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
              {errors.location && (
                <ErrorMessage>{errors.location.join(", ")}</ErrorMessage>
              )}
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
            {errors.bio && <ErrorMessage>{errors.bio.join(", ")}</ErrorMessage>}
            {errors._form && (
              <ErrorMessage>{errors._form.join(", ")}</ErrorMessage>
            )}
          </div>
        </div>
        <EditUserButtons toggleEdit={toggleEdit} />
      </form>
    </>
  );
}

export default EditUserForm;
