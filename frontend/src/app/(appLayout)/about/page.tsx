import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import React from "react";
import Image from "next/image";
import bearlogo from "/public/bearlogo.jpg";
import logo from "/public/logo.png";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

function page() {
  return (
    <PageContainer>
      <PageTitle>About</PageTitle>
      <Image
        src={logo}
        alt=" logo"
        className="h-[200px] w-[200px] rounded-full"
      />
      <p>
        <strong className="text-xl">asozial</strong> is an open-source community
        that sees no distinction between users, stakeholders, and developers.
      </p>
      <p>
        It was created at Ironhack, Berlin by three students, one teacher, and a
        thousand cups of coffee as a final project.
      </p>
      <p>
        Check out our repo to see how you can improve asozial for yourself and
        your fellow devs. If you have a github account, you can contribute.
      </p>
      <Button variant="ghost">
        <a
          href="https://github.com/jrcopeti/asozial"
          className="flex flex-row justify-evenly gap-2"
        >
          Contribute on <Github size={24} />
        </a>
      </Button>
    </PageContainer>
  );
}

export default page;
