"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/actions";
import bearlogoDark from "/public/bearlogoDark.jpg";
import bearlogoBlurredDark from "/public/bearLogoBlurredDark.jpg";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import LoadingSpinner from "@/components/common/ui/loading/LoadingSpinner";

const heroText = (text: string, strong: string) => {
  return (
    <h1 className="text-2xl font-thin text-slate-300">
      {text}{" "}
      <strong className="text-3xl font-normal text-white">{strong}</strong>
    </h1>
  );
};

function LandingPage() {
  const [clicked, setClicked] = React.useState(false);
  return (
    <div className="relative h-screen w-screen bg-[#1C2121]">
      <div className="h-screenlg:w-1/2 absolute inset-0 z-0 mx-auto xl:w-1/2">
        <Image
          src={bearlogoDark}
          alt="bear logo"
          fill
          // objectFit="cover"
          placeholder="blur"
          blurDataURL={bearlogoBlurredDark.src}
        />
      </div>
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-12 bg-black bg-opacity-80">
        <div className="mx-auto flex w-3/4 flex-col gap-12 lg:w-1/2 xl:w-1/2">
          <div className="flex flex-row items-baseline gap-4">
            <h1 className="text-left text-7xl">asozial</h1>
            <p className="font-serif text-2xl font-light">noun</p>
          </div>
          <p className="text-serif flex flex-row items-center gap-2 text-2xl text-slate-300">
            <strong className="text-2xl font-bold">:</strong>social media for
            the anti-social developer
          </p>
          <div className="flex flex-row items-center justify-between">
            <div className="ga-6 flex flex-col">
              {heroText("Find your new", "clique")}
              {heroText("Build something", "sick")}
            </div>
            <form action={signIn} className="flex flex-row justify-end">
              <Button
                className="flex gap-3 px-8"
                type="submit"
                onClick={() => setClicked(true)}
              >
                {clicked ? "Signing in..." : "Sign in with"}
                {clicked ? <FaGithub size={24} /> : <LoadingSpinner />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
