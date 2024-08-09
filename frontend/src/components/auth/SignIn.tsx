"use client";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import getUser from "@/app/actions/getUser.server";
import Link from "next/link";

function SignIn() {
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const foundUser = await fetch("http://localhost:5005/auth", {
        method: "GET",
        headers: {
          "Allow-Control-Allow-Origin": "*",
        },
      });
      if (!foundUser) {
        console.log("User not found");
      } else {
        console.log(foundUser);
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
