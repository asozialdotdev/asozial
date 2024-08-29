"use client";

import { useFormState } from "react-dom";
import { restoreMember } from "@/actions";
import ErrorMessage from "../../common/ui/ErrorMessage";
import CustomLabel from "../../common/ui/Label";
import { ProjectId } from "@/types/Project";
import { UserId } from "@/types/User";
import RestoreButton from "./RestoreButton";

type RestoreMemberProps = {
  projectId: ProjectId;
  memberId: UserId;
};

function RestoreMember({ projectId, memberId }: RestoreMemberProps) {
  const [formState, action] = useFormState(restoreMember, {
    errors: {},
  });
  const errors = formState.errors?.restore;
  const success = formState.success;
  return (
    <form className="flex w-full items-end justify-end" action={action}>
      <CustomLabel htmlFor="restore"></CustomLabel>
      <input type="hidden" name="projectId" value={projectId?.toString()} />
      <input type="hidden" name="memberId" value={memberId?.toString()} />
      <RestoreButton success={success} />
      {errors && (
        <ErrorMessage size={15} className="absolute bottom-1 text-xs">
          {errors.join(", ")}
        </ErrorMessage>
      )}
    </form>
  );
}

export default RestoreMember;
