"use client";

import getUser from "@/actions/getUser.server";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import ProjectContainer from "@/components/project/ProjectContainer";
import UserContainer from "@/components/user/UserContainer";
import { useSignInContext } from "@/context/SignInContext";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import getUserFromGithub from "@/actions/getUserFromGithub.server";
import { cookies } from "next/headers";

function Page() {
  const searchParams = useSearchParams();
  const githubCode = searchParams.get("code");

  const { id, setId, avatar, setAvatar, username, setUsername } =
    useUserContext();

  useEffect(() => {
    if (githubCode) {
      try {
        const response = axios
          .post("http://localhost:5005/auth", {
            code: githubCode,
          })
          .then((res) => {
            console.log(res);
            setId(res.data._id);
            setAvatar(res.data.avatarUrl);
            setUsername(res.data.username);
          });
        console.log(response);
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
      {/* <ProjectContainer /> */}
    </>
  );
}

export default Page;
