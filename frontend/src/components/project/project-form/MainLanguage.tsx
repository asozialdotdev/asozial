import ErrorMessage from "@/components/common/ui/ErrorMessage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Inputs } from "@/types/Project";
import CustomLabel from "@/components/common/ui/Label";

type MainLanguageProps = {
  control: Control<Inputs> | undefined;
  errors: FieldErrors<Inputs>;
  spokenLanguages: string[];
};
function MainLanguage({ control, errors, spokenLanguages }: MainLanguageProps) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <CustomLabel htmlFor="mainLanguage" required>
        Language
      </CustomLabel>

      <Controller
        name="mainLanguage"
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
            name="mainLanguage"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>

            <SelectContent id="mainLanguage">
              {spokenLanguages.map((language, i) => (
                <SelectItem key={language + i} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {errors.mainLanguage && (
        <ErrorMessage>{errors.mainLanguage.message}</ErrorMessage>
      )}
    </div>
  );
}

export default MainLanguage;
