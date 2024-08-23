import CustomLabel from "@/components/common/ui/Label";
import Image from "next/image";
import github from "/public/socials/github.png";
import { Control, Controller } from "react-hook-form";
import CustomInput from "@/components/common/ui/CustomInput";
import { Inputs } from "@/types/Project";

type GithubRepoProps = {
  control: Control<Inputs> | undefined;
};
function GithubRepo({ control }: GithubRepoProps) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <CustomLabel htmlFor="gitHubRepo"></CustomLabel>
      <CustomLabel htmlFor="socials">Socials</CustomLabel>

      <div className="flex flex-col gap-2">
        <Image
          src={github}
          alt="Github"
          width={30}
          height={30}
          className="inline dark:invert dark:filter"
        />
        <Controller
          name="githubRepo"
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              type="text"
              id="githubRepo"
              placeholder="https://github.com/username/repo"
            />
          )}
        />
      </div>
    </div>
  );
}

export default GithubRepo;
