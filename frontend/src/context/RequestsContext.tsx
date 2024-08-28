"use client";
import { checkMembersApplied } from "@/actions";
import { Project } from "@/types/Project";
import { createContext, useContext, useEffect, useState } from "react";

type RequestsContextType = {
  projectsRequests: Project[];
  projectsLoading: boolean;
  projectsError: string;
};

const defaultContextValue: RequestsContextType = {
  projectsRequests: [],
  projectsLoading: true,
  projectsError: "",
};

const RequestContext = createContext<RequestsContextType>(defaultContextValue);

function RequestsProvider({ children }: { children: React.ReactNode }) {
  const [projectsRequests, setProjectsRequests] = useState([]);
  const [projectsError, setProjectsError] = useState("");
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [friendsRequests, setFriendsRequests] = useState([]);

  useEffect(() => {
    const getAllProjectsRequests = async () => {
      console.log("getAllProjectsRequests bein called");
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

  return (
    <RequestContext.Provider
      value={{ projectsRequests, projectsLoading, projectsError }}
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
