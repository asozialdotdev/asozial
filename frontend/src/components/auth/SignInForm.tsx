"use client";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import getUser from "@/actions/getUser.server";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PageTitle from "../common/PageTitle";
import axios from "axios";
import { useSignInContext } from "@/context/SignInContext";

function SignInForm() {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      window.location.href = "http://localhost:5005/auth";
    } catch (error) {
      console.error("Failed to redirect to GitHub", error);
    }
  };

  return (
    <form
      className="flex h-[600px] w-[600px] flex-col items-center justify-around rounded border-2 bg-light p-6"
      onSubmit={(e) => onSubmit(e)}
    >
      <PageTitle>Continue with gitHub</PageTitle>
      <div className="flex flex-row gap-8">
        <Image src="/asozial.png" width={100} height={100} alt="asozial" />
        <Image src="/github.png" width={100} height={100} alt="github" />
      </div>
      <Button
        variant={"secondary"}
        className="mx-auto flex w-1/2 flex-row justify-center gap-2 rounded-xl border-2 p-2"
        type="submit"
      >
        Continue with
        <FaGithub size={24} />
      </Button>
    </form>
  );
}

export default SignInForm;
