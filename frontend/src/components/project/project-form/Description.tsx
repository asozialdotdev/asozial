import CustomLabel from "@/components/common/ui/Label";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Inputs } from "@/types/Project";
import ErrorMessage from "@/components/common/ui/ErrorMessage";
import { Input } from "@/components/ui/input";

type DescriptionProps = {
  control: Control<Inputs> | undefined;
  errors: FieldErrors<Inputs>;
};

function Description({ control, errors }: DescriptionProps) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <CustomLabel htmlFor="description" required>
        Description
      </CustomLabel>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            id="description"
            name="description"
            placeholder="What is your project about?"
          />
        )}
      />
      {errors.description && (
        <ErrorMessage>{errors.description.message}</ErrorMessage>
      )}
    </div>
  );
}

export default Description;