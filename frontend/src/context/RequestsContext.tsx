"use client";
import { checkMembersApplied, getUserFriendStatuses } from "@/actions";

import { Project } from "@/types/Project";
import { createContext, useContext, useEffect, useState } from "react";
import { Friendship } from "@/types/Friendship";

type FriendsRequest = {
  accepted: Friendship[];
  pending: Friendship[];
  declined: Friendship[];
};

type RequestsContextType = {
  projectsRequests: Project[];
  projectsLoading: boolean;
  projectsError: string;
  friendsRequests: FriendsRequest;

  friendsLoading: boolean;
  friendsError: string;
};

const defaultContextValue: RequestsContextType = {
  projectsRequests: [],
  projectsLoading: true,
  projectsError: "",
  friendsRequests: {
    accepted: [],
    pending: [],
    declined: [],
  },
  friendsLoading: true,
  friendsError: "",
};

const RequestContext = createContext<RequestsContextType>(defaultContextValue);

function RequestsProvider({ children }: { children: React.ReactNode }) {
  const [projectsRequests, setProjectsRequests] = useState([]);
  const [projectsError, setProjectsError] = useState("");
  const [projectsLoading, setProjectsLoading] = useState(true);

  const [friendsRequests, setFriendsRequests] = useState<FriendsRequest>({
    accepted: [],
    pending: [],
    declined: [],
  });
  const [friendsError, setFriendsError] = useState("");
  const [friendsLoading, setFriendsLoading] = useState(true);

  useEffect(() => {
    const getAllProjectsRequests = async () => {
      try {
        setProjectsLoading(true);
        setProjectsError("");
        const response = await checkMembersApplied();
        if (!response.error) {
          setProjectsRequests(response.projects);
        } else {
          setProjectsError(response.message);
        }
      } catch (error) {
        setProjectsError("An unexpected error occurred");
      } finally {
        setProjectsLoading(false);
      }
    };

    getAllProjectsRequests();
  }, []);

  useEffect(() => {
    const getAllFriendsRequests = async () => {
      try {
        setFriendsLoading(true);
        setFriendsError("");
        const response = await getUserFriendStatuses();
        if (!response.error) {
          setFriendsRequests(response);
        } else {
          setFriendsError(response.message);
        }
      } catch (error) {
        setFriendsError("An unexpected error occurred");
      } finally {
        setFriendsLoading(false);
      }
    };

    getAllFriendsRequests();
  }, []);

  return (
    <RequestContext.Provider
      value={{
        projectsRequests,
        projectsLoading,
        projectsError,
        friendsRequests,
        friendsLoading,
        friendsError,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

function useRequests() {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error("useRequests must be used within a RequestsProvider");
  }
  return context;
}

export { RequestsProvider, useRequests };
