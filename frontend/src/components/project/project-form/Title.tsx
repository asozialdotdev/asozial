import CustomInput from "@/components/common/ui/CustomInput";
import ErrorMessage from "@/components/common/ui/ErrorMessage";
import CustomLabel from "@/components/common/ui/Label";
import { Input } from "@/components/ui/input";
import { Inputs } from "@/types/Project";
import { Control, Controller, FieldErrors } from "react-hook-form";

type TitleProps = {
  control: Control<Inputs> | undefined;
  errors: FieldErrors<Inputs>;
};
function Title({ control, errors }: TitleProps) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <CustomLabel htmlFor="title" required>
        Title
      </CustomLabel>

      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <CustomInput
            {...field}
            type="text"
            id="title"
            name="title"
            placeholder="The title of your project"
          />
        )}
      />
      {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
    </div>
  );
}

export default Title;
