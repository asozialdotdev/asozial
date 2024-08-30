"use client";
import { User, UserId } from "@/types/User";
import { Building, Edit2Icon, Globe, Mail, MapPinHouse } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import EditIcon from "../common/ui/icons/EditIcon";
import { Button } from "../ui/button";
import EditUserForm from "./EditUserForm";

function UserInfo({
  user,
  actualUserId,
}: {
  user: User;
  actualUserId?: UserId;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    console.log("clicked");
    setIsEditing((prev) => !prev);
  };

  return (
    <>
      {/* User Info */}
      {!isEditing ? (
        <>
          <div className="flex w-full flex-col gap-4 lg:flex-row lg:justify-evenly lg:gap-0">
            <div className="flex flex-col items-center gap-8 lg:items-start">
              <div className="flex flex-row items-start gap-4 hover:opacity-75 lg:items-center lg:gap-8">
                <Globe size={16} />
                <a
                  href={"https://" + !user.info.website || "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user.info?.website || "----"}
                </a>
              </div>
              <div className="flex flex-row items-center gap-4 lg:gap-8">
                <Mail size={16} />
                {user.info.email || "----"}
              </div>
            </div>

            <div className="mt-4 lg:mt-0 flex flex-col items-center gap-8 lg:items-start">
              <div className="flex flex-row items-center gap-4 lg:gap-8">
                <Building size={16} />
                {user.info.company || "----"}
              </div>

              <div className="flex flex-row items-center gap-4 lg:gap-8">
                <MapPinHouse size={16} />
                {user.info.location || "Planet Earth"}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col flex-wrap items-center text-center text-base">
            <p
              className={`italic before:text-2xl before:font-bold before:content-['"'] after:text-2xl after:font-bold after:content-['"']`}
            >
              {user.github.bio}
            </p>

            {actualUserId === user._id && (
              <div className="self-end">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={toggleEdit}
                  className="flex items-center gap-2"
                >
                  <span>
                    <Edit2Icon size={15} />
                  </span>
                  <p>{isEditing ? "Cancel" : "Edit"}</p>
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <EditUserForm toggleEdit={toggleEdit} user={user} />
      )}
    </>
  );
}

export default UserInfo;
