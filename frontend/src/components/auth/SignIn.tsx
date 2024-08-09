import User from "@/types/User";
import { FaGithub } from "react-icons/fa";

function SignIn({ user }: { user: User }) {
  return (
    <form>
      <h2>Sign In With Github</h2>
      <button type="submit">
        {user.username}
        <FaGithub size={24} />
      </button>
    </form>
  );
}

export default SignIn;
