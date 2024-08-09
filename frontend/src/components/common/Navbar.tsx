"use client";

import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CiLight, CiDark } from "react-icons/ci";

import Image from "next/image";
import { useThemeContext } from "@/context/ThemeContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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

  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav
      className={`flex w-full flex-col gap-2 border-b-2 p-6 ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}
    >
      <h1 className="text-2xl">asozial</h1>
      <p className="font-sans">A social app for asozial devs</p>
      <div className="flex flex-row gap-4 self-end">
        <button onClick={toggleTheme}>
          {theme === "light" ? <CiLight /> : <CiDark />}
        </button>
        <button onClick={() => setIsOpen(!isOpen)}>Contributors</button>
      </div>
      {isOpen && (
        <ul className="flex w-full flex-row flex-wrap justify-between py-10 font-sans">
          {contributors.map((contributor) => (
            <li
              key={contributor.name}
              className="flex flex-col items-center gap-2"
            >
              <h2 className="font-serif text-xl">{contributor.name}</h2>
              <Image
                src={contributor.github + ".png"}
                alt={contributor.name}
                className={`h-24 w-24 rounded-full border-4 ${theme === "light" ? "border-dark" : "border-light"}`}
                height={24}
                width={24}
              />
              <div className="flex flex-row gap-4">
                <a
                  title="github"
                  href={contributor.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  title="linkedin"
                  href={contributor.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
              <a href={`mailto:${contributor.email}`}>{contributor.email}</a>
              <a href={contributor.website} target="_blank" rel="noreferrer">
                {contributor.website}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
