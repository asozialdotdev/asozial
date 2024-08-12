"use client";

import getUser from "@/actions/getUser.server";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import ProjectContainer from "@/components/project/ProjectContainer";
import UserContainer from "@/components/user/UserContainer";
import { useSignInContext } from "@/context/SignInContext";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import getUserFromGithub from "@/actions/getUserFromGithub.server";

function Page() {
  const { code, setCode } = useSignInContext();
  const searchParams = useSearchParams();

  const githubCode = searchParams.get("code");

  useEffect(() => {
    if (githubCode) {
      console.log(githubCode);
      setCode(githubCode);
      try {
        const data = {
          code: githubCode,
        };
        getUserFromGithub({ data, githubCode });
      } catch (error) {
        console.error("Failed to authenticate with GitHub");
        console.log(error);
      }
    }
  }, []);

  return (
    <>
      <UserContainer />
      <DashboardContainer />
    </>
  );
}

export default Page;
