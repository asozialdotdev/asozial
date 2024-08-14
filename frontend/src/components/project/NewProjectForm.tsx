import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSpokenLanguages from "@/hooks/useSpokenLanguages";

function NewProjectForm() {
  const { spokenLanguages, isLoadingSpokenLanguages, errorSpokenLanguages } =
    useSpokenLanguages();
  return (
    <div className="mt-4 w-full">
      <h2 className="text-xl font-semibold">Create a new project</h2>
      <form className="mt-2 flex w-full flex-col gap-2">
        {/* Title */}
        <div className="mt-6 flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-light"></label>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="text"
                  name="title"
                  placeholder="The title of your project"
                  className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
                />
              </TooltipTrigger>
              <TooltipContent align="start">Title</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Description */}
        <div className="mt-6 flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-light"></label>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="text"
                  name="description"
                  placeholder="What is your project about?"
                  className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
                />
              </TooltipTrigger>
              <TooltipContent align="start">Description</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Pitch */}
        <div className="mt-6 flex flex-col gap-2">
          <label htmlFor="pitch" className="text-sm font-light"></label>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger>
                <Textarea
                  name="pitch"
                  placeholder="Describe what is your project about and why other members should join it..."
                  className="h-32 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
                />
              </TooltipTrigger>
              <TooltipContent align="start">Pitch</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* TechStack */}
        <div className="mt-6 flex flex-col gap-2">
          <label htmlFor="techStack" className="text-sm font-light"></label>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>

            <SelectContent>
              {spokenLanguages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}

            </SelectContent>
          </Select>
        </div>

        <Button className="my-2 bg-dark dark:bg-light">Create</Button>
      </form>
    </div>
  );
}

export default NewProjectForm;
