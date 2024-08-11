const getAllProjects = async () => {
  "use server";
  const projects = await fetch("/projects/search", {
    method: "GET",
  });
  if (!projects) {
    console.log("Projects not found");
  } else {
    return projects;
  }
};

export default getAllProjects;
