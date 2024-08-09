"use client";

import { useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaRegUserCircle } from "react-icons/fa";
import { CiLight, CiDark } from "react-icons/ci";

import Image from "next/image";

import { useProjectSidebar } from "@/hooks/useProjectSidebar";

import { useThemeContext } from "@/context/ThemeContext";
import { useUserSidebar } from "@/hooks/useUserSidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMenu, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import useMergeRefs from "@/hooks/useCombinedRef";

function Navbar() {
  const { toggleProjectSidebar, projectHeaderRef } = useProjectSidebar();
  const { toggleUserSidebar, userHeaderRef } = useUserSidebar();
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  useOutsideClick(() => setIsOpen(false), navRef);

  const mergedRefs = useMergeRefs(navRef, projectHeaderRef, userHeaderRef);

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
    <>
      <nav
        ref={mergedRefs}
        className={`sticky top-0 z-40 flex w-full justify-between gap-2 border-b-2 px-6 py-2 ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}
      >
        {!isOpen && (
          <>
            <section className="flex items-center gap-2">
              <h1
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer text-2xl"
              >
                asozial
              </h1>

              <button onClick={toggleUserSidebar}>
                <FaRegUserCircle size={20} />
              </button>
            </section>

            <section className="flex items-center gap-2">
              <button onClick={() => setIsOpen(!isOpen)}>Contributors</button>
              <button className="" onClick={toggleTheme}>
                {theme === "light" ? (
                  <IoSunnyOutline size={26} />
                ) : (
                  <IoMoonOutline size={22} />
                )}
              </button>

              <button onClick={toggleProjectSidebar}>
                <IoMenu size={26} />
              </button>
            </section>
          </>
        )}

        {isOpen && (
          <ul className="flex w-full flex-row flex-wrap justify-evenly py-10 font-sans">
            {contributors.map((contributor) => (
              <li
                key={contributor.name}
                className="flex flex-col items-center gap-2"
              >
                <h2 className="font-serif text-xl">{contributor.name}</h2>
                <Image
                  src={contributor.github + ".png"}
                  alt={contributor.name}
                  width={100}
                  height={100}
                  className={`h-24 w-24 rounded-full border-4 ${theme === "light" ? "border-dark" : "border-light"}`}
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
    </>
  );
}

export default Navbar;
