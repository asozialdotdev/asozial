"use client";
import { sendFriendship } from "@/actions";
import ErrorMessage from "@/components/common/ui/ErrorMessage";
import CustomLabel from "@/components/common/ui/Label";
import { useFormState } from "react-dom";
import ButtonAddFriend from "./ButtonAddFriend";

function AddFriendForm({ receiverId }: { receiverId: string }) {
  const [formState, action] = useFormState(sendFriendship, {
    errors: {},
  });
  const success = formState.success;
  return (
    <form action={action}>
      <CustomLabel htmlFor="send"></CustomLabel>
      <input type="hidden" name="receiverId" value={receiverId} />
      <ButtonAddFriend success={success} />
      <div className="absolute bottom-2 right-4 z-40 p-2 text-[8px] lg:text-sm">
        {formState.errors?.send && (
          <ErrorMessage>{formState.errors?.send.join(", ")}</ErrorMessage>
        )}
      </div>
    </form>
  );
}

export default AddFriendForm;
