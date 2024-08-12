"use client";

import { createContext, useContext, useState, ReactNode, FC } from "react";
import { User } from "@/types/User";

const UserContext = createContext({});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [_Id, set_Id] = useState("");
  const [githubId, setGithubId] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [accessToken, setAccessToken] = useState("");

  return (
    <UserContext.Provider
      value={{
        _Id,
        set_Id,
        githubId,
        setGithubId,
        name,
        setName,
        username,
        setUsername,
        email,
        setEmail,
        avatar,
        setAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
