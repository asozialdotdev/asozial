import { User } from "@/types/User";
import Image from "next/image";

function UserComponentAvatar({ user }: { user: User }) {
  return (
    <>
      {user && user.info.image && user.info.image ? (
        <Image
          className="rounded-full border-4 border-dark p-1 dark:border-light"
          src={user.info.image}
          alt={user.username}
          loading="lazy"
          width={100}
          height={100}
        />
      ) : (
        <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-800"></div>
      )}
    </>
  );
}

export default UserComponentAvatar;
