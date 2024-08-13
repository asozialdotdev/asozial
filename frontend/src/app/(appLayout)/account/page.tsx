"use client";

import PageCard from "@/components/common/PageCard";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import { User } from "@/types/User";
import { useEffect, useState } from "react";

function Page() {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:5005/account", {
          method: "GET",
          headers: {
            Authorization: `${accessToken}`,
          },
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const userData: User = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);
  return (
    <PageContainer className="gap-8">
      {user && (
        <>
          <PageTitle>{user.username}</PageTitle>
          <PageCard>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit non
            provident, dolore magnam totam quis necessitatibus dolorum harum
            dignissimos laboriosam.
          </PageCard>
          <PageCard>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa,
            pariatur.
          </PageCard>
        </>
      )}
    </PageContainer>
  );
}

export default Page;
