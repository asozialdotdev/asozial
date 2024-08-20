"use client";

import { useState } from "react";
import type { User } from "@/types/User";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { languagesWithColors } from "@/constants/index";

function UserSearchContainer({ allUsers }: { allUsers: User[] }) {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(allUsers);
  return (
    <div>
      <div className="flex flex-col">
        <Input
          type="text"
          placeholder="Username search"
          onChange={(e) => {
            const searchValue = e.target.value;
            const filteredUsers = allUsers.filter((user) => {
              return user?.username
                ?.toLowerCase()
                .includes(searchValue.toLowerCase());
            });
            setFilteredUsers(filteredUsers);
          }}
        />
        <div className="flex flex-wrap">
          {languagesWithColors.map((lang) => (
            <Button key={lang.language} variant={"secondary"}>
              {lang.language}
              {lang.Icon && <lang.Icon />}
            </Button>
          ))}
        </div>
      </div>

      <ul>
        {filteredUsers.map((user: User) => (
          <li key={user._id.toString()}>
            <a href={`/users/${user.username}`}>{user.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearchContainer;
