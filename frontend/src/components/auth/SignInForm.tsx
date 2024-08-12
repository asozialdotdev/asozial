"use client";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import getUser from "@/actions/getUser.server";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function SignInForm() {
  const searchParams = useSearchParams();
  console.log(searchParams);

  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      console.log(code);
      const user = getUser();
      if (!user) {
        console.log("User not found again");
      } else {
        console.log(user);
      }
    }
  }, [code]);

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
      <h2 className="text-3xl font-bold text-black">Continue with Github</h2>
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
