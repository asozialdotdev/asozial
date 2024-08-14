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
import { Checkbox } from "@/components/ui/checkbox";

import discord from "/public/socials/discord.png";
import slack from "/public/socials/slack.png";
import notion from "/public/socials/notion.png";
import gitlab from "/public/socials/gitlab.png";

import useSpokenLanguages from "@/hooks/useSpokenLanguages";
import { languagesWithColors } from "@/constants";
import Image from "next/image";

function NewProjectForm() {
  const { spokenLanguages, isLoadingSpokenLanguages, errorSpokenLanguages } =
    useSpokenLanguages();
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submission prevented");
    // Your form submission logic here
  }
  return (
    <div className="mt-4 w-full">
      <h2 className="text-xl font-semibold">Create a new project</h2>
      <form onSubmit={handleSubmit} className="mt-2 flex w-full flex-col gap-4">
        {/* Title */}
        <div className="mt-6 flex flex-col gap-2">
          <label htmlFor="title"></label>
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
        <div className="flex flex-col gap-2">
          <label htmlFor="mainLanguage" className="font-semibold">
            Language
          </label>

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

        <div className="flex flex-col gap-2">
          <label htmlFor="techStack" className="font-semibold">
            Tech Stack
          </label>
          <div className="grid grid-cols-3 items-center gap-3">
            {languagesWithColors.map((stack) => (
              <div key={stack.language} className="flex items-center gap-2">
                <Checkbox id={stack.language} />
                <label
                  htmlFor={stack.language}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {stack.language}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Socials */}

        <div>
          <label htmlFor="socials" className="font-semibold">
            Socials
          </label>
          <div className="mt-6 flex flex-col gap-2">
            <label htmlFor="socials"></label>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <Input
                    type="text"
                    name="socials"
                    placeholder="https://app.slack.com/..."
                    className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
                  />
                </TooltipTrigger>
                <TooltipContent align="start">
                  <Image
                    src={slack}
                    alt="Slack"
                    width={50}
                    height={50}
                    className="inline"
                  />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <label htmlFor="socials"></label>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <Input
                    type="text"
                    name="socials"
                    placeholder="https://discord.com/..."
                    className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
                  />
                </TooltipTrigger>
                <TooltipContent align="start">
                  <Image
                    src={discord}
                    alt="Discord"
                    width={60}
                    height={60}
                    className="inline"
                  />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <label htmlFor="socials"></label>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <Input
                    type="text"
                    name="socials"
                    placeholder="http://notion.so/..."
                    className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
                  />
                </TooltipTrigger>
                <TooltipContent align="start">
                  <Image
                    src={notion}
                    alt="Notion"
                    width={20}
                    height={20}
                    className="inline"
                  />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <label htmlFor="socials"></label>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <Input
                    type="text"
                    name="socials"
                    placeholder="https://gitlab.com/..."
                    className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
                  />
                </TooltipTrigger>
                <TooltipContent align="start">
                  <Image
                    src={gitlab}
                    alt="Gitlab"
                    width={50}
                    height={50}
                    className="inline"
                  />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <Button type="button" className="my-2 bg-dark dark:bg-light">
          Create
        </Button>
      </form>
    </div>
  );
}

export default NewProjectForm;
