//Lib
import { auth } from "@/auth";

//Components
import AddFriendForm from "../requests/AddFriendForm";
import UserInfo from "./UserInfo";
import UserFriends from "./UserFriends";
import UserProjectsOwned from "./UserProjectsOwned";
import UserProjectsJoined from "./UserProjectsJoined";
import UserTechStack from "./UserTechStack";
import UserGithubButton from "./UserGithubButton";
import UserGithubStatus from "./UserGithubStatus";
import UserComponentAvatar from "./UserComponentAvatar";

//Types
import type { User } from "../../types/User";
import { Project } from "@/types/Project";
import { Friendship } from "@/types/Friendship";

type ProjectJoined = {
  _id: string;
  title: string;
  slug: string;
  username: {
    info: {
      username: string;
    };
  };
};

type UserComponentProps = {
  result: {
    user: User & {
      friendsAccepted: User[];
      projectsOwned: Project[];
      projectsJoined: ProjectJoined[];

      friendsCount: number;
      projectsOwnedCount: number;
      projectsJoinedCount: number;
    };
    counts: {
      friendsCount: number;
      projectsOwnedCount: number;
      projectsJoinedCount: number;
    };
    isFriend: boolean;
  };
  friends: Friendship[];
  dashboard?: boolean;
};

async function UserComponent({
  result,
  friends,
  dashboard,
}: UserComponentProps) {
  const {
    user,
    counts: { projectsOwnedCount, projectsJoinedCount },
    isFriend,
  } = result;
  console.log("UserComponent -> user", user, isFriend);
  const { projectsOwned, projectsJoined } = user;

  const session = await auth();
  const actualUserId = session?.user?.id;

  let formattedDate = "Unknown";
  if (user?.github?.createdAt) {
    const githubCreatedAtDate = new Date(user.github.createdAt);
    formattedDate = githubCreatedAtDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  }
  return (
    <section className="flex w-full flex-col gap-8 pb-4 text-lg font-light">
      <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row">
        {/* Avatar */}
        <UserComponentAvatar user={user} />

        <div className="flex flex-col justify-evenly gap-4">
          {/* Username */}
          {!dashboard && (
            <h3 className="text-2xl font-semibold">{user.info.username}</h3>
          )}
          <p className="text-sm">Github user since {formattedDate}</p>
          <UserGithubStatus user={user} />
          {/* Github Button */}
          <div className="flex gap-4">
            <UserGithubButton user={user} />

            <div className="self-end">
              {/* Friend Form  */}
              {actualUserId !== user._id.toString() && !isFriend && (
                <AddFriendForm receiverId={user._id.toString()} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <UserInfo user={user} actualUserId={actualUserId} />

      {/* Tech Stack */}
      <UserTechStack user={user} />

      {/* Friends */}
      <UserFriends user={user} actualUserId={actualUserId} friends={friends} />

      {/* Projects Owned */}
      <UserProjectsOwned
        user={user}
        projectsOwned={projectsOwned}
        projectsOwnedCount={projectsOwnedCount}
      />

      {/* Projects Joined */}
      <UserProjectsJoined
        projectsJoinedCount={projectsJoinedCount}
        projectsJoined={projectsJoined}
      />
    </section>
  );
}

export default UserComponent;
