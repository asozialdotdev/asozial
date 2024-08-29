import CustomLabel from "@/components/common/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Inputs } from "@/types/Project";
import { Control, Controller, Field } from "react-hook-form";
import { projectStatus } from "@/constants";

type StatusProps = {
  control: Control<Inputs> | undefined;
};

function Status({ control }: StatusProps) {
  return (
    <div className="mt-6 flex flex-col gap-2">
      <CustomLabel htmlFor="status" required>
        Status
      </CustomLabel>
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
            name="status"
          >
            <SelectTrigger className="w-[180px] capitalize">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent id="status">
              {projectStatus.map((s) => (
                <SelectItem className="capitalize" key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}

export default Status;
