const getAllProjects = async () => {
  "use server";
  const projects = await fetch("/api/projects", {
    method: "GET",
  });
  if (!projects) {
    console.log("Projects not found");
  } else {
    return projects;
  }
};

export default getAllProjects;
