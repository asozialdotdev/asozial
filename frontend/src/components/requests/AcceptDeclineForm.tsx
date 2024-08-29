"use client";
//React
import { useFormState } from "react-dom";
//Actions
import { acceptMember, declineMember } from "@/actions";

//Ui
import CustomLabel from "../common/ui/Label";
import ErrorMessage from "../common/ui/ErrorMessage";
import AcceptButton from "../requests/AcceptButton";

//Types
import { ProjectId } from "@/types/Project";
import { UserId } from "@/types/User";
import DeclineButton from "./DeclineButton";

type AcceptDeclineFormProps = {
  projectId: ProjectId;
  memberId: UserId;
  sidebar?: boolean;
};

function AcceptDeclineForm({
  projectId,
  memberId,
  sidebar,
}: AcceptDeclineFormProps) {
  const [acceptFormState, acceptAction] = useFormState(acceptMember, {
    errors: {},
  });

  const [declineFormState, declineAction] = useFormState(declineMember, {
    errors: {},
  });
  const acceptSuccess = acceptFormState.success;
  const acceptErrors = acceptFormState.errors?.accept;

  const declineSuccess = declineFormState.success;
  const declineErrors = declineFormState.errors?.decline;

  return (
    <div className="flex items-center gap-3">
      {/* Accept form */}
      <form className="flex flex-col gap-2" action={acceptAction}>
        <CustomLabel htmlFor="accept"></CustomLabel>
        <input type="hidden" name="projectId" value={projectId?.toString()} />
        <input type="hidden" name="memberId" value={memberId?.toString()} />
        {!declineSuccess && (
          <AcceptButton sidebar={sidebar} acceptSuccess={acceptSuccess} />
        )}
        {acceptErrors && !declineErrors && (
          <ErrorMessage
            size={sidebar ? 11 : 15}
            className={`absolute ${sidebar ? "-bottom-1 right-10 text-[10px]" : "bottom-4 right-10 text-[11px]"}`}
          >
            Error accepting member
          </ErrorMessage>
        )}
      </form>

      {/* Decline form */}
      <form className="flex w-full flex-col gap-2" action={declineAction}>
        <CustomLabel htmlFor="decline"></CustomLabel>
        <input type="hidden" name="projectId" value={projectId?.toString()} />
        <input type="hidden" name="memberId" value={memberId?.toString()} />
        {!acceptSuccess && (
          <DeclineButton sidebar={sidebar} declineSuccess={declineSuccess} />
        )}
        {declineErrors && !acceptErrors && (
          <ErrorMessage
            size={sidebar ? 11 : 15}
            className={`absolute ${sidebar ? "-bottom-1 right-10 text-[10px]" : "bottom-4 right-10 text-[11px]"}`}
          >
            Error declining member
          </ErrorMessage>
        )}
      </form>
    </div>
  );
}

export default AcceptDeclineForm;
