import React from "react";
import { contributors } from "@/constants";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function ContributorsDetails() {
  return (
    <ul className="flex w-full flex-row flex-wrap justify-evenly py-10 font-sans">
      {contributors.map((contributor) => (
        <li key={contributor.name} className="flex flex-col items-center gap-2">
          <h2 className="font-serif text-xl">{contributor.name}</h2>
          <Image
            src={contributor.github + ".png"}
            alt={contributor.name}
            width={100}
            height={100}
            className="rounded-full border-4 border-dark p-1 dark:border-light"
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
  );
}

export default ContributorsDetails;
