"use client";

import { useFormState } from "react-dom";
import { removeMember } from "@/actions";
import ErrorMessage from "../common/ui/ErrorMessage";
import LeaveButton from "./LeaveButton";
import CustomLabel from "../common/ui/Label";
import { Project, ProjectId } from "@/types/Project";
import RemoveButton from "./RemoveButton";
import { UserId } from "@/types/User";

type RemoveMemberFormProps = {
  projectId: ProjectId;
  memberId: UserId;
};

function RemoveMemberForm({ projectId, memberId }: RemoveMemberFormProps) {
  const [formState, action] = useFormState(removeMember, {
    errors: {},
  });
  const errors = formState.errors?.remove;
  const success = formState.success;
  return (
    <form className="flex w-full items-end justify-end" action={action}>
      <CustomLabel htmlFor="remove"></CustomLabel>
      <input type="hidden" name="projectId" value={projectId?.toString()} />
      <input type="hidden" name="memberId" value={memberId?.toString()} />
      <RemoveButton success={success} />
      {errors && <ErrorMessage size={15} className='absolute text-xs bottom-1'>{errors.join(", ")}</ErrorMessage>}
    </form>
  );
}

export default RemoveMemberForm;
