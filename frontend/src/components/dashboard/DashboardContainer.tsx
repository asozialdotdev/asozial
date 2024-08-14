"use client";

import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function DashboardContainer() {
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
    const authenticateWithGitHub = async () => {
      try {
        const response = await axios.post("http://localhost:5005/auth", {
          code: githubCode,
        });
        storeToken(response.headers.authorization.split(" ")[1]);
        setIsLoggedIn(true);
        setId(response.data._id);
        setAvatar(response.data.avatarUrl);
        setUsername(response.data.username);

        console.log(response.data);
      } catch (error) {
        console.error("Failed to authenticate with GitHub");
        console.log(error);
        setIsLoggedIn(false);
      }
    };

    if (githubCode) {
      authenticateWithGitHub();
    }
  }, [githubCode]);

  return (
    <section className="flex grow flex-col border-dark bg-light p-4 text-dark dark:border-light dark:bg-dark dark:text-light lg:border-x">
      <h1 className="py-6 text-xl">Dashboard</h1>
      <p className="text-lg">Here goes the feed or any other stuff</p>
      <p>{username}</p>
      <p>{id}</p>
    </section>
  );
}

export default DashboardContainer;
