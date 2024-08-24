import ErrorMessage from "@/components/common/ui/ErrorMessage";
import CustomLabel from "@/components/common/ui/Label";
import { Textarea } from "@/components/ui/textarea";
import { Inputs } from "@/types/Project";
import { Control, Controller, FieldErrors } from "react-hook-form";
type PitchProps = {
  control: Control<Inputs> | undefined;
  errors: FieldErrors<Inputs>;
};
function Pitch({ control, errors }: PitchProps) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <CustomLabel htmlFor="pitch" required>
        Pitch
      </CustomLabel>

      <Controller
        name="pitch"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            id="pitch"
            name="pitch"
            placeholder="Describe what is your project about and why other members should join it..."
          />
        )}
      />

      {errors.pitch && <ErrorMessage>{errors.pitch.message}</ErrorMessage>}
    </div>
  );
}

export default Pitch;
