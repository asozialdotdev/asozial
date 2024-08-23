"use server";
const getAllProjects = async () => {
  const projects = await fetch("/api/projects", {
    method: "GET",
  });
  if (!projects) {
    console.log("Projects not found");
  } else {
    return projects;
  }
};

export { getAllProjects };
