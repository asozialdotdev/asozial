import discord from "/public/socials/discord.png";
import slack from "/public/socials/slack.png";
import notion from "/public/socials/notion.png";
import gitlab from "/public/socials/gitlab.png";
import { Project, SocialsData } from "@/types/Project";
import React from "react";
import {
  FaLaravel,
  FaPython,
  FaJsSquare,
  FaRust,
  FaInnosoft,
  FaReact,
  FaNodeJs,
  FaCss3Alt,
  FaHtml5,
  FaTerminal,
  FaLess,
  FaPhp,
  FaDocker,
  FaSwift,
  FaJava,
  FaVuejs,
  FaAngular,
} from "react-icons/fa";
import {
  SiTypescript,
  SiScilab,
  SiPowershell,
  SiClojure,
  SiHandlebarsdotjs,
  SiJulia,
  SiJupyter,
  SiVisualbasic,
  SiPug,
  SiDart,
  SiLua,
  SiKotlin,
} from "react-icons/si";
import { BsFiletypeScss } from "react-icons/bs";
import { DiGroovy, DiPerl, DiRuby, DiCoffeescript } from "react-icons/di";
import { GiButterfly } from "react-icons/gi";
import { RiSvelteFill } from "react-icons/ri";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5005";
console.log("baseUrl in CONSTANTS:", baseUrl);

const languagesWithColors: {
  language: string;
  bgColor: string;
  textColor: string;
  library?: string;
  Icon?: any;
}[] = [
  {
    language: "TypeScript",
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
    library: "si",
    Icon: SiTypescript,
  },
  {
    language: "SQL",
    bgColor: "bg-yellow-500",
    textColor: "text-yellow-500",
    library: "fa",
    Icon: FaInnosoft,
  },
  {
    language: "PostgreSQL",
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
    library: "fa",
    Icon: FaInnosoft,
  },
  {
    language: "Kotlin",
    bgColor: "bg-orange-500",
    textColor: "text-orange-500",
    library: "si",
    Icon: SiKotlin,
  },
  {
    language: "JavaScript",
    bgColor: "bg-yellow-600",
    textColor: "text-yellow-600",
    library: "fa",
    Icon: FaJsSquare,
  },
  {
    language: "React",
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
    library: "fa",
    Icon: FaReact,
  },
  {
    language: "Node.js",
    bgColor: "bg-green-500",
    textColor: "text-green-500",
    library: "fa",
    Icon: FaNodeJs,
  },
  {
    language: "Rust",
    bgColor: "bg-brown-500",
    textColor: "text-brown-500",
    library: "fa",
    Icon: FaRust,
  },
  {
    language: "CSS",
    bgColor: "bg-blue-600",
    textColor: "text-blue-600",
    library: "fa",
    Icon: FaCss3Alt,
  },
  {
    language: "HTML",
    bgColor: "bg-orange-500",
    textColor: "text-orange-500",
    library: "fa",
    Icon: FaHtml5,
  },
  {
    language: "Inno Setup",
    bgColor: "bg-gray-500",
    textColor: "text-gray-500",
    library: "fa",
    Icon: FaInnosoft,
  },
  {
    language: "Scilab",
    bgColor: "bg-indigo-500",
    textColor: "text-indigo-500",
    library: "si",
    Icon: SiScilab,
  },
  {
    language: "Shell",
    bgColor: "bg-green-500",
    textColor: "text-green-500",
    library: "fa",
    Icon: FaTerminal,
  },
  {
    language: "PowerShell",
    bgColor: "bg-blue-700",
    textColor: "text-blue-700",
    library: "si",
    Icon: SiPowershell,
  },
  { language: "Batchfile", bgColor: "bg-gray-600", textColor: "text-gray-600" },
  {
    language: "SCSS",
    bgColor: "bg-pink-500",
    textColor: "text-pink-500",
    library: "bs",
    Icon: BsFiletypeScss,
  },
  {
    language: "Groovy",
    bgColor: "bg-blue-400",
    textColor: "text-blue-400",
    library: "di",
    Icon: DiGroovy,
  },
  { language: "Cuda", bgColor: "bg-yellow-600", textColor: "text-yellow-600" },
  { language: "C++", bgColor: "bg-blue-700", textColor: "text-blue-700" },
  { language: "Makefile", bgColor: "bg-gray-700", textColor: "text-gray-700" },
  {
    language: "Python",
    bgColor: "bg-yellow-500",
    textColor: "text-yellow-500",
    library: "fa",
    Icon: FaPython,
  },
  {
    language: "Perl",
    bgColor: "bg-purple-600",
    textColor: "text-purple-600",
    library: "di",
    Icon: DiPerl,
  },
  {
    language: "Ruby",
    bgColor: "bg-red-600",
    textColor: "text-red-600",
    library: "di",
    Icon: DiRuby,
  },
  { language: "TeX", bgColor: "bg-blue-400", textColor: "text-blue-400" },
  {
    language: "Objective-C",
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
  },
  {
    language: "Objective-C++",
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
  },
  {
    language: "Clojure",
    bgColor: "bg-green-600",
    textColor: "text-green-600",
    library: "si",
    Icon: SiClojure,
  },
  {
    language: "Handlebars",
    bgColor: "bg-orange-400",
    textColor: "text-orange-400",
    library: "si",
    Icon: SiHandlebarsdotjs,
  },
  {
    language: "Less",
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
    library: "fa",
    Icon: FaLess,
  },
  {
    language: "PHP",
    bgColor: "bg-purple-500",
    textColor: "text-purple-500",
    library: "fa",
    Icon: FaPhp,
  },
  {
    language: "Dockerfile",
    bgColor: "bg-blue-600",
    textColor: "text-blue-600",
    library: "fa",
    Icon: FaDocker,
  },
  {
    language: "Julia",
    bgColor: "bg-purple-400",
    textColor: "text-purple-400",
    library: "si",
    Icon: SiJulia,
  },
  {
    language: "Jupyter Notebook",
    bgColor: "bg-orange-600",
    textColor: "text-orange-600",
    library: "si",
    Icon: SiJupyter,
  },
  {
    language: "Visual Basic .NET",
    bgColor: "bg-purple-600",
    textColor: "text-purple-600",
    library: "si",
    Icon: SiVisualbasic,
  },
  { language: "C#", bgColor: "bg-green-500", textColor: "text-green-500" },
  { language: "C", bgColor: "bg-blue-800", textColor: "text-blue-800" },
  {
    language: "Raku",
    bgColor: "bg-pink-600",
    textColor: "text-pink-600",
    library: "gi",
    Icon: GiButterfly,
  },
  {
    language: "Pug",
    bgColor: "bg-green-600",
    textColor: "text-green-600",
    library: "si",
    Icon: SiPug,
  },
  { language: "Go", bgColor: "bg-blue-400", textColor: "text-blue-400" },
  { language: "F#", bgColor: "bg-indigo-600", textColor: "text-indigo-600" },
  {
    language: "CoffeeScript",
    bgColor: "bg-yellow-700",
    textColor: "text-yellow-700",
    library: "di",
    Icon: DiCoffeescript,
  },
  { language: "R", bgColor: "bg-blue-500", textColor: "text-blue-500" },
  { language: "Roff", bgColor: "bg-gray-500", textColor: "text-gray-500" },
  { language: "ShaderLab", bgColor: "bg-gray-700", textColor: "text-gray-700" },
  {
    language: "Dart",
    bgColor: "bg-blue-400",
    textColor: "text-blue-400",
    library: "si",
    Icon: SiDart,
  },
  {
    language: "Swift",
    bgColor: "bg-orange-500",
    textColor: "text-orange-500",
    library: "fa",
    Icon: FaSwift,
  },
  {
    language: "Lua",
    bgColor: "bg-blue-600",
    textColor: "text-blue-600",
    library: "si",
    Icon: SiLua,
  },
  { language: "HLSL", bgColor: "bg-gray-600", textColor: "text-gray-600" },
  { language: "Hack", bgColor: "bg-gray-400", textColor: "text-gray-400" },
  {
    language: "Laravel",
    bgColor: "bg-red-500",
    textColor: "text-red-500",
    library: "fa",
    Icon: FaLaravel,
  },
  {
    language: "Java",
    bgColor: "bg-red-600",
    textColor: "text-red-600",
    library: "fa",
    Icon: FaJava,
  },
  {
    language: "React Native",
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
    library: "fa",
    Icon: FaReact,
  },
  {
    language: "React",
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
    library: "fa",
    Icon: FaReact,
  },
  {
    language: "Vue",
    bgColor: "bg-green-500",
    textColor: "text-green-500",
    library: "fa",
    Icon: FaVuejs,
  },
  {
    language: "Angular",
    bgColor: "bg-red-600",
    textColor: "text-red-600",
    library: "fa",
    Icon: FaAngular,
  },
  {
    language: "Svelte",
    bgColor: "bg-orange-500",
    textColor: "text-orange-500",
    library: "fa",
    Icon: RiSvelteFill,
  },
];

const contributors = [
  {
    id: "josé",
    name: "José Copeti",
    email: "jrcopeti@gmail.com",
    github: "https://github.com/jrcopeti",
    linkedin: "https://www.linkedin.com/in/josecopeti/",
    website: "https://jrcopeti.hashnode.dev/",
  },
  {
    id: "benjamin",
    name: "Benjamin Elliott",
    email: "hello@benjamin.dev",
    github: "https://github.com/benjamindotdev",
    linkedin: "https://www.linkedin.com/in/benjamindotdev/",
    website: "https://benjamin.dev",
  },
  {
    id: "mirko",
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

const projectStatus: Project["status"][] = ["active", "inactive", "completed"];

export {
  baseUrl,
  languagesWithColors,
  contributors,
  socialsData,
  projectStatus,
};
