import { User, UserId } from "@/types/User";
import UserCard from "./UserCard";
import Pagination from "../common/ui/Pagination";

type UsersTableProps = {
  allUsers: User[];
  actualUserId?: UserId;
  currentPage: number;
  totalPages: number;
};

function UsersTable({
  allUsers,
  actualUserId,
  totalPages,
  currentPage,
}: UsersTableProps) {
  return (
    <div className="w-full flex-grow">
      <ul className="flex w-full flex-col gap-8 py-6">
        {allUsers &&
          allUsers.map((user) => (
            <UserCard
              key={user._id.toString()}
              user={user}
              actualUserId={actualUserId}
            />
          ))}
      </ul>
      <div className="mt-auto w-full">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}

export default UsersTable;
