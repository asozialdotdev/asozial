//check if user exists
//if user exists, display user
//else, create new user using Omar's code

import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";

function Page() {
  return (
    <div>
      <SignIn />
      <SignUp />
    </div>
  );
}

export default Page;
