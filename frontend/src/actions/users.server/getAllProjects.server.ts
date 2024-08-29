"use server";
const getAllProjects = async () => {
  const projects = await fetch("/api/projects", {
    method: "GET",
  });
  if (!projects) {
  } else {
    return projects;
  }
};

export { getAllProjects };
