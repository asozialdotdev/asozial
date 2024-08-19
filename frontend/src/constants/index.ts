import discord from "/public/socials/discord.png";
import slack from "/public/socials/slack.png";
import notion from "/public/socials/notion.png";
import gitlab from "/public/socials/gitlab.png";
import { SocialsData } from "@/types/Project";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5005";
console.log("baseUrl in CONSTANTS:", baseUrl);

const languagesWithColors = [
  { language: "TypeScript", color: "bg-blue-500" },
  { language: "JavaScript", color: "bg-yellow-500" },
  { language: "CSS", color: "bg-blue-600" },
  { language: "Rust", color: "bg-orange-500" },
  { language: "HTML", color: "bg-red-500" },
  { language: "Inno Setup", color: "bg-gray-500" },
  { language: "Scilab", color: "bg-indigo-500" },
  { language: "Shell", color: "bg-green-500" },
  { language: "PowerShell", color: "bg-blue-700" },
  { language: "Batchfile", color: "bg-gray-600" },
  { language: "SCSS", color: "bg-pink-500" },
  { language: "Groovy", color: "bg-blue-400" },
  { language: "Cuda", color: "bg-yellow-600" },
  { language: "C++", color: "bg-blue-700" },
  { language: "Makefile", color: "bg-gray-700" },
  { language: "Python", color: "bg-yellow-400" },
  { language: "Perl", color: "bg-purple-600" },
  { language: "Ruby", color: "bg-red-600" },
  { language: "TeX", color: "bg-blue-400" },
  { language: "Objective-C", color: "bg-blue-500" },
  { language: "Objective-C++", color: "bg-blue-500" },
  { language: "Clojure", color: "bg-green-600" },
  { language: "Handlebars", color: "bg-orange-400" },
  { language: "Less", color: "bg-blue-500" },
  { language: "PHP", color: "bg-purple-500" },
  { language: "Dockerfile", color: "bg-blue-600" },
  { language: "Julia", color: "bg-purple-400" },
  { language: "Jupyter Notebook", color: "bg-orange-600" },
  { language: "Visual Basic .NET", color: "bg-purple-600" },
  { language: "C#", color: "bg-green-500" },
  { language: "C", color: "bg-blue-800" },
  { language: "Raku", color: "bg-pink-600" },
  { language: "Pug", color: "bg-green-600" },
  { language: "Go", color: "bg-blue-400" },
  { language: "F#", color: "bg-indigo-600" },
  { language: "Java", color: "bg-red-700" },
  { language: "CoffeeScript", color: "bg-yellow-700" },
  { language: "R", color: "bg-blue-500" },
  { language: "Roff", color: "bg-gray-500" },
  { language: "ShaderLab", color: "bg-gray-700" },
  { language: "Dart", color: "bg-blue-400" },
  { language: "Swift", color: "bg-orange-500" },
  { language: "Lua", color: "bg-blue-600" },
  { language: "HLSL", color: "bg-gray-600" },
  { language: "Hack", color: "bg-gray-400" },
  { language: "Laravel", color: "bg-red-500" },
];

const contributors = [
  {
    name: "José Copeti",
    email: "jrcopeti@gmail.com",
    github: "https://github.com/jrcopeti",
    linkedin: "https://www.linkedin.com/in/josecopeti/",
    website: "https://jrcopeti.hashnode.dev/",
  },
  {
    name: "Benjamin Elliott",
    email: "hello@benjamin.dev",
    github: "https://github.com/benjamindotdev",
    linkedin: "https://www.linkedin.com/in/benjamindotdev/",
    website: "https://benjamin.dev",
  },
  {
    name: "Mirko Fede",
    email: "mirko@asozial.com",
    github: "https://github.com/mirkoeffe",
    linkedin: "https://www.linkedin.com/in/mirko-fede/",
    website: "http://mirkoeffe.shop/",
  },
];

const socialsData: SocialsData[] = [
  {
    key: "notion",
    placeholder: "http://notion.so/...",
    imageSrc: notion,
    alt: "Notion",
  },
  {
    key: "slack",
    placeholder: "https://app.slack.com/...",
    imageSrc: slack,
    alt: "Slack",
  },
  {
    key: "discord",
    placeholder: "https://discord.com/...",
    imageSrc: discord,
    alt: "Discord",
  },
  {
    key: "gitlab",
    placeholder: "https://gitlab.com/...",
    imageSrc: gitlab,
    alt: "Gitlab",
  },
];

const projectStatus = ["active", "inactive", "completed"];

export { baseUrl, languagesWithColors, contributors, socialsData, projectStatus };
