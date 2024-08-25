import PageContainer from "../common/containers/PageContainer";
import PageTitle from "../common/ui/PageTitle";
import { auth } from "@/auth";
import FileUploader from "../common/ui/ImageUploader";
import { getUserFriendStatuses } from "@/actions/friendships.server/getUserFriendStatuses";
import { get } from "http";
import UserAvatar from "../common/ui/image/UserAvatar";
import { Button } from "../ui/button";
import { UserRoundCheck, UserRoundX } from "lucide-react";

async function DashboardContainer() {
  const session = await auth();
  const userFriendStatuses = await getUserFriendStatuses();

  console.log("userFriendStatuses", userFriendStatuses);
  return (
    <PageContainer>
      <section className="flex w-full flex-col gap-4">
        <PageTitle className="text-center">Dashboard</PageTitle>
        <div>
          <h2 className="text-lg">
            Welcome back,{" "}
            <span className="font-semibold">
              {session?.user?.githubUsername}
            </span>
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            A quick overview of your account.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded bg-white p-4 shadow dark:bg-black">
            <h2 className="text-lg font-bold">Projects</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">0</p>
          </div>
          <div className="rounded bg-white p-4 shadow dark:bg-black">
            <h2 className="text-lg font-bold">Posts</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">0</p>
          </div>
          <div className="rounded bg-white p-4 shadow dark:bg-black">
            <h2 className="text-lg font-bold">Friends</h2>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              {Object.entries(userFriendStatuses).map(
                ([key, status]: [string, any]) => (
                  <div key={key}>
                    {status &&
                      status.map((friend: any) => (
                        <div
                          className="flex flex-row items-center justify-between gap-4"
                          key={friend.username}
                        >
                          <div className="flex flex-row items-center gap-2">
                            <UserAvatar
                              src={friend.image}
                              userId={friend.id}
                              username={friend.username}
                            />
                            <p className="text-sm text-dark dark:text-light">
                              {friend.username}
                            </p>
                          </div>
                          <div className="flex flex-row items-center">
                            <Button variant={"ghost"}>
                              <UserRoundX />
                            </Button>
                            <Button variant={"ghost"}>
                              <UserRoundCheck />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <FileUploader />
      </section>
    </PageContainer>
  );
}

export default DashboardContainer;
