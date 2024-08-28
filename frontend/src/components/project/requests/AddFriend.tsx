"use client";
import { sendFriendship } from "@/actions";
import ButtonAddFriend from "@/components/common/ui/buttons/ButtonAddFriend";
import ErrorMessage from "@/components/common/ui/ErrorMessage";
import CustomLabel from "@/components/common/ui/Label";
import { useFormState } from "react-dom";

function AddFriend({ receiverId }: { receiverId: string }) {
  const [formState, action] = useFormState(sendFriendship, {
    errors: {},
  });
  const success = formState.success;
  return (
    <form action={action}>
      <CustomLabel htmlFor="send"></CustomLabel>
      <input type="hidden" name="receiverId" value={receiverId} />
      <ButtonAddFriend success={success} />
      {formState.errors?.send && (
        <ErrorMessage>{formState.errors?.send.join(", ")}</ErrorMessage>
      )}
    </form>
  );
}

export default AddFriend;
