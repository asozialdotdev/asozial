"use client";

import PageCard from "@/components/common/PageCard";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import { User } from "@/types/User";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import Image from "next/image";

function Page() {
  const { id, username, avatar, isLoggedIn } = useUserContext();
  const [user, setUser] = useState<User>({
    githubID: id,
    username: username,
    avatarUrl: avatar,
  });

  return (
    <PageContainer className="gap-8">
      {isLoggedIn && (
        <>
          <PageTitle>{user.username}</PageTitle>
          <Image src={user.avatarUrl} width={100} height={100} alt="avatar" />
        </>
      )}
    </PageContainer>
  );
}

export default Page;
