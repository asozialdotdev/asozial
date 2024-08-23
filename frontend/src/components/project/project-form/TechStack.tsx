import ErrorMessage from "@/components/common/ui/ErrorMessage";
import CustomLabel from "@/components/common/ui/Label";
import { Checkbox } from "@/components/ui/checkbox";
import { languagesWithColors } from "@/constants";
import { Inputs } from "@/types/Project";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldErrors,
} from "react-hook-form";

type TechStackProps = {
  control: Control<Inputs> | undefined;
  errors: FieldErrors<Inputs>;
  watch: (name: string) => string[];
  handleCheckedChange: (
    checked: boolean | string,
    field: ControllerRenderProps<Inputs, "techStack">,
    language: string,
  ) => void;
};

function TechStack({
  control,
  errors,
  watch,
  handleCheckedChange,
}: TechStackProps) {
  const techStackValues = watch("techStack");

  return (
    <div className="mt-4 flex flex-col gap-2">
      <CustomLabel htmlFor="techStack" required>
        Tech Stack
      </CustomLabel>
      <div className="mt-2 grid grid-cols-3 items-center gap-3">
        {languagesWithColors.map((stack, i) => (
          <div key={stack.language + i} className="flex items-center gap-2">
            <Controller
              name="techStack"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id={stack.language}
                  checked={techStackValues.includes(stack.language)}
                  onCheckedChange={(checked) =>
                    handleCheckedChange(checked, field, stack.language)
                  }
                />
              )}
            />
            <label
              htmlFor={stack.language}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {stack.language}
            </label>
          </div>
        ))}
      </div>
      {errors.techStack && (
        <ErrorMessage>{errors.techStack.message}</ErrorMessage>
      )}
    </div>
  );
}

export default TechStack;
