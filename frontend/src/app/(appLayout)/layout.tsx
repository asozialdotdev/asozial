import Main from "@/components/common/Main";
import ProjectSidebar from "@/components/project/ProjectSidebar";
import UserSidebar from "@/components/user/UserSidebar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full">
      <div className="w-[18rem]">
        <UserSidebar />
      </div>
      <div className="flex-1">
        <Main>{children}</Main>
      </div>
      <div className="w-[18rem]">
        <ProjectSidebar />
      </div>
    </div>
  );
}

export default layout;
