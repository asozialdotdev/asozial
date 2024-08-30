import { User } from "@/types/User";
import { Button } from "../ui/button";
import { Github } from "lucide-react";

function UserGithubButton({ user }: { user: User }) {
  return (
    <Button variant={"outline"}>
      <a
        href={user.github.url}
        target="_blank"
        rel="noreferrer"
        className="flex flex-row items-center gap-2"
      >
        View on <Github size={16} />
      </a>
    </Button>
  );
}

export default UserGithubButton;
