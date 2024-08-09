"use client";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import getUser from "@/app/actions/getUser.server";

function SignIn() {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      const user = getUser();
      if (!user) {
        console.log("User not found again");
      } else {
        console.log(user);
      }
    }
  }, [code]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const foundUser = await fetch("/auth", {
        method: "GET",
      });
      if (!foundUser) {
        console.log("User not found");
      } else {
      }
    } catch (error) {
      console.error;
    }
  };

  return (
    <form
      className="flex w-1/2 flex-col rounded border-2"
      onSubmit={(e) => onSubmit(e)}
    >
      <h2>Sign In With Github</h2>
      <Link className="border-2" type="submit" href="/dashboard">
        Sign In
        <FaGithub size={24} />
      </Link>
    </form>
  );
}

export default SignIn;
