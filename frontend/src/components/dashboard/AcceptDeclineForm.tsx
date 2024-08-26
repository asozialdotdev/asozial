"use client";
//React
import { useFormState } from "react-dom";
//Actions
import { acceptMember, declineMember } from "@/actions";

//Ui
import CustomLabel from "../common/ui/Label";
import ErrorMessage from "../common/ui/ErrorMessage";
import DeclineButton from "./DeclineButton";
import AcceptButton from "./AcceptButton";

//Types
import { Member, Project } from "@/types/Project";

type AcceptDeclineFormProps = {
  project: Project;
  member: Member;
};

function AcceptDeclineForm({ project, member }: AcceptDeclineFormProps) {
  const [acceptFormState, acceptAction] = useFormState(acceptMember, {
    errors: {},
  });

  const [declineFormState, declineAction] = useFormState(declineMember, {
    errors: {},
  });
  const acceptSuccess = acceptFormState.success;
  const acceptErrors = acceptFormState.errors?.accept;
  console.log("acceptErrors", acceptErrors);
  console.log("acceptSuccess", acceptSuccess);

  const declineSuccess = declineFormState.success;
  const declineErrors = declineFormState.errors?.decline;

  return (
    <div className="flex items-center gap-3">
      {/* Accept form */}
      <form className="flex flex-col gap-2" action={acceptAction}>
        <CustomLabel htmlFor="accept"></CustomLabel>
        <input type="hidden" name="projectId" value={project._id.toString()} />
        <input type="hidden" name="memberId" value={member._id.toString()} />
        {!declineSuccess && <AcceptButton acceptSuccess={acceptSuccess} />}
        {acceptErrors && (
          <ErrorMessage
            size={15}
            className="absolute bottom-4 right-10 text-[11px]"
          >
            Error accepting member
          </ErrorMessage>
        )}
      </form>

      {/* Decline form */}
      <form className="flex w-full flex-col gap-2" action={declineAction}>
        <CustomLabel htmlFor="decline"></CustomLabel>
        <input type="hidden" name="projectId" value={project._id.toString()} />
        <input type="hidden" name="memberId" value={member._id.toString()} />
        {!acceptSuccess && <DeclineButton declineSuccess={declineSuccess} />}
        {declineErrors && (
          <ErrorMessage
            size={15}
            className="absolute bottom-4 right-10 text-[11px]"
          >
            Error declining member
          </ErrorMessage>
        )}
      </form>
    </div>
  );
}

export default AcceptDeclineForm;