"use client";
//React
import { useFormState } from "react-dom";
//Actions
import { acceptFriendship, declineFriendship } from "@/actions";

//Ui
import CustomLabel from "../common/ui/Label";
import ErrorMessage from "../common/ui/ErrorMessage";
import AcceptButton from "./AcceptButton";

//Types

import DeclineButton from "./DeclineButton";

type AcceptDeclineFriendshipProps = {
  friendshipId: string;
  sidebar?: boolean;
};

function AcceptDeclineFriendshipForm({
  friendshipId,
  sidebar,
}: AcceptDeclineFriendshipProps) {
  const [acceptFormState, acceptAction] = useFormState(acceptFriendship, {
    errors: {},
  });

  const [declineFormState, declineAction] = useFormState(declineFriendship, {
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
        <input type="hidden" name="friendshipId" value={friendshipId} />
        {!declineSuccess && (
          <AcceptButton sidebar={sidebar} acceptSuccess={acceptSuccess} />
        )}
        {acceptErrors && !declineErrors && (
          <ErrorMessage
            size={sidebar ? 11 : 15}
            className={`absolute ${sidebar ? "-bottom-1 right-10 text-[10px]" : "bottom-4 right-10 text-[11px]"}`}
          >
            Error accepting friend
          </ErrorMessage>
        )}
      </form>

      {/* Decline form */}
      <form className="flex w-full flex-col gap-2" action={declineAction}>
        <CustomLabel htmlFor="decline"></CustomLabel>
        <input type="hidden" name="friendshipId" value={friendshipId} />
        {!acceptSuccess && (
          <DeclineButton sidebar={sidebar} declineSuccess={declineSuccess} />
        )}
        {declineErrors && !acceptErrors && (
          <ErrorMessage
            size={sidebar ? 11 : 15}
            className={`absolute ${sidebar ? "-bottom-1 right-10 text-[10px]" : "bottom-4 right-10 text-[11px]"}`}
          >
            Error declining friend
          </ErrorMessage>
        )}
      </form>
    </div>
  );
}

export default AcceptDeclineFriendshipForm;
