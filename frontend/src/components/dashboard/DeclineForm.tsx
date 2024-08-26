"use client";
import CustomLabel from "../common/ui/Label";
import { acceptMember } from "@/actions/projects.server/acceptMember.server";
import { Member, Project } from "@/types/Project";
import { useFormState } from "react-dom";
import ErrorMessage from "../common/ui/ErrorMessage";
import AcceptButton from "./AcceptButton";
import DeclineButton from "./DeclineButton";
import { declineMember } from "@/actions";

type DeclineFormProps = {
  project: Project;
  member: Member;
};

function DeclineForm({ project, member }: DeclineFormProps) {
  const [formState, action] = useFormState(declineMember, {
    errors: {},
  });

  return (
    <form className="flex w-full flex-col gap-2" action={action}>
      <CustomLabel htmlFor="decline"></CustomLabel>
      <input type="hidden" name="projectId" value={project._id.toString()} />
      <input type="hidden" name="memberId" value={member._id.toString()} />
      <DeclineButton error={formState.errors?.decline} />
      <div className="absolute bottom-0 left-0 top-0 flex flex-wrap"></div>
    </form>
  );
}

export default DeclineForm;
