import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import React from "react";
import Image from "next/image";
import bearlogo from "/public/bearlogo.jpg";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

function page() {
  return (
    <PageContainer>
      <PageTitle>About</PageTitle>
      <Image
        src={bearlogo}
        alt="bear logo"
        className="h-[400px] w-[400px] rounded-lg"
      />
      <p>
        asozial is an open-source, developer focused and developer driven social
        media platform.
      </p>
      <p>
        It was created at Ironhack, Berlin by three students, one teacher, and a
        thousand cups of coffee.
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
