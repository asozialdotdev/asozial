"use client";

import MyProjects from "@/components/project/MyProjects";
import PageContainer from "@/components/common/PageContainer";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";

function MyProjectsPage() {
  const { id } = useUserContext();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const fetchProjects = async () => {
      try {
        const projects = await fetch("http://localhost:5005/api/projects", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (projects) {
          setProjects(projects);
        } else {
          setProjects([]); // Handle the case where projects is undefined
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects([]); // Handle the error case
      }
    };

    fetchProjects();
  }, [id]);

  return (
    <PageContainer className="gap-10">
      <h1>My Projects</h1>
      {projects.length === 0 && <p>No projects found</p>}
      {projects.length > 0 && <MyProjects projects={projects} />}
    </PageContainer>
  );
}

export default MyProjectsPage;
