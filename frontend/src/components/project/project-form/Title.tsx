//React
import { useCallback, useEffect, useRef, useState } from "react";
//Actions
import { checkProjectTitle } from "@/actions";

//Ui
import ErrorMessage from "@/components/common/ui/ErrorMessage";
import CustomLabel from "@/components/common/ui/Label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Inputs } from "@/types/Project";
import { SquareCheck } from "lucide-react";

//Lib
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import SuccessMessage from "@/components/common/ui/SuccessMessage";
import LoadingTextButton from "@/components/common/ui/loading/LoadingTextButton";

type TitleProps = {
  errors: FieldErrors<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  editTitle?: string;
  syncTitle?: string;
};
function Title({ errors, setValue, editTitle, syncTitle }: TitleProps) {
  const [title, setTitle] = useState(syncTitle || editTitle || "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const hasChanged = useRef(false);

  const handleValidation = useCallback(async () => {
    setIsValidating(true);
    if (!title) {
      setError("Seems like you forgot to enter a title.");
      return;
    }
    const response = await checkProjectTitle(title);
    if (response.isUnique === true) {
      setSuccess("Title is valid and unique");
      setError("");
      setValue("title", title);
      setIsValidating(false);
    } else {
      setError("A project with this name already exists for your account.");
      setSuccess("");
      setIsValidating(false);
    }
  }, [title, setError, setSuccess, setValue]);

  useEffect(() => {
    if (syncTitle && !hasChanged.current) {
      setTitle(syncTitle);
      setValue("title", syncTitle);
    } else if (editTitle && !hasChanged.current) {
      setTitle(editTitle);
      setValue("title", editTitle);
    }
  }, [syncTitle, editTitle, setValue]);

  useEffect(() => {
    if (title !== (syncTitle || editTitle)) {
      hasChanged.current = true;
      setValue("title", title);
    }
  }, [title, syncTitle, editTitle, setValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleValidation();
    }
  };
  return (
    <div className="mt-4 flex w-full flex-col gap-2">
      <CustomLabel htmlFor="title" required>
        Title
      </CustomLabel>

      <div className="flex items-center">
        <Input
          placeholder="The title of your project"
          className="h-12 w-full rounded-r-none border-r-0 focus:h-10"
          name="title"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!!syncTitle}
        />
        <Button
          onClick={handleValidation}
          type="button"
          className="h-12 w-24 min-w-24 rounded-l-none border-l-0 text-lg"
          disabled={!!syncTitle || isValidating}
        >
          {isValidating ? <LoadingTextButton /> : "Validate"}
        </Button>
      </div>

      {success && <SuccessMessage>{success}</SuccessMessage>}

      {(errors.title || error) && (
        <ErrorMessage>{errors?.title?.message || error}</ErrorMessage>
      )}
    </div>
  );
}

export default Title;
