"use client";

import { fetchAllProjects } from "@/actions";
import PageContainer from "@/components/common/PageContainer";
import MyProjects from "@/components/project/MyProjects";
import { baseUrl } from "@/constants";
import { useState, useEffect } from "react";

function MyProjectsPage() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const foundProjects = fetchAllProjects(accessToken);
        if (foundProjects) {
          setProjects(foundProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects");
        console.log(error);
      }
    }
  }, []);

  return (
    <PageContainer className="gap-10">
      {projects && <MyProjects projects={projects} />}
    </PageContainer>
  );
}

export default MyProjectsPage;
