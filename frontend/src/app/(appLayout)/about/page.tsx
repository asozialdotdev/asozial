import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import React from "react";
import Image from "next/image";
import bearlogo from "/public/bearlogo.jpg";

function page() {
  return (
    <PageContainer>
      <PageTitle>About</PageTitle>
      <Image
        src={bearlogo}
        alt="bear logo"
        className="h-[400px] w-[400px] rounded-lg"
      />
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor ea nihil
      temporibus dignissimos veniam officiis adipisci reiciendis quisquam illo
      libero, eveniet, natus, alias voluptas quas! Maiores repellendus veniam
      dolores, quia tempora facilis sit unde quas aut eos voluptatibus adipisci
      dolor voluptate laboriosam quisquam voluptatum saepe dolorum ipsa culpa
      nobis blanditiis.
    </PageContainer>
  );
}

export default page;
