"use client";
import CustomLabel from "../common/ui/Label";
import { Member, Project } from "@/types/Project";
import { useFormState } from "react-dom";
import ErrorMessage from "../common/ui/ErrorMessage";
import AcceptButton from "./AcceptButton";
import { acceptMember } from "@/actions";

type AcceptFormProps = {
  project: Project;
  member: Member;
};

function AcceptForm({ project, member }: AcceptFormProps) {
  const [formState, action] = useFormState(acceptMember, {
    errors: {},
  });

  return (
    <form className="flex flex-col gap-2" action={action}>
      <CustomLabel htmlFor="apply"></CustomLabel>
      <input type="hidden" name="projectId" value={project._id.toString()} />
      <input type="hidden" name="memberId" value={member._id.toString()} />
      <AcceptButton error={formState.errors.apply} />
    </form>
  );
}

export default AcceptForm;
