"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  id: string;
  setId: (id: string) => void;
  avatar: string;
  setAvatar: (avatarUrl: string) => void;
  username: string;
  setUsername: (username: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [id, setId] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  return (
    <UserContext.Provider
      value={{ id, setId, avatar, setAvatar, username, setUsername }}
    >
      {children}
    </UserContext.Provider>
  );
};


export const useUserContext = () => {

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, UserContext };
