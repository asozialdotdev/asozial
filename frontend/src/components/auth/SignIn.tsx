"use client";
import { useEffect, useState } from "react";
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
      className="flex w-1/2 flex-col rounded border-2"
      onSubmit={(e) => onSubmit(e)}
    >
      <h2>Sign In With Github</h2>
      <button className="border-2" type="submit">
        Sign In
        <FaGithub size={24} />
      </button>
    </form>
  );
}

export default SignIn;
