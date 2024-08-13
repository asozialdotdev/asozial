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

function Page() {
  const searchParams = useSearchParams();
  const githubCode = searchParams.get("code");

  const {
    id,
    setId,
    avatar,
    setAvatar,
    username,
    setUsername,
    isLoggedIn,
    setIsLoggedIn,
    storeToken,
  } = useUserContext();

  useEffect(() => {
    try {
      if (githubCode) {
        const response = axios
          .post("http://localhost:5005/auth", {
            code: githubCode,
          })
          .then((res) => {
            console.log("just before res");
            console.log(res);
            storeToken(res.headers.authorization.split(" ")[1]);
            setIsLoggedIn(true);
            setId(res.data._id);
            setAvatar(res.data.avatarUrl);
            setUsername(res.data.username);
            console.log("just after res");
            console.log(
              id,
              username,
              avatar,
              localStorage.getItem("accessToken"),
            );
          });
      }
    } catch (error) {
      console.error("Failed to authenticate with GitHub");
      console.log(error);
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      {isLoggedIn && <UserContainer />}
      <DashboardContainer />
      {/* <ProjectContainer /> */}
    </>
  );
}

export default Page;
