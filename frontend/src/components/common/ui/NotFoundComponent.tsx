import Image from "next/image";
import PageContainer from "../containers/PageContainer";
import ButtonBack from "./buttons/ButtonBack";
import PageTitle from "./PageTitle";
import bearNotFound from "@/../public/bearNotFound.webp";

type NotFoundComponentProps = {
  page?: string;
  message: string;
};

function NotFoundComponent({ page, message }: NotFoundComponentProps) {
  return (
    <PageContainer>
      <PageTitle>{page}</PageTitle>
      <h2 className="text-center text-xl">{message}</h2>

      <div>
        <Image
          src={bearNotFound}
          alt="Bear not found"
          width={300}
          height={300}
        />
      </div>
      <div className="flex items-center gap-2">
        <ButtonBack />
        Go Back
      </div>
    </PageContainer>
  );
}

export default NotFoundComponent;
