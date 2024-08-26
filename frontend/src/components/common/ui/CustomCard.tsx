import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

type CustomCardProps = {
  href?: Url;
  title: string;
  description: string;
  content1: JSX.Element;
  titleContent2?: string;
  content2?: string;
  content3?: JSX.Element;
  titleContent4?: string;
  content4?: JSX.Element;
  footer?: string;
};

function CustomCard({
  href = "/",
  title,
  description,
  content1,
  titleContent2,
  content2,
  content3,
  titleContent4,
  content4,
  footer,
}: CustomCardProps) {
  return (
    <>
      <Card className="max-h-[28rem] min-h-fit min-w-[20rem] max-w-[20rem] overflow-y-auto overflow-x-hidden border-dashed border-zinc-300 bg-inherit bg-zinc-100 pl-1 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800">
        <CardHeader>
          <Link href={href}>
            <CardTitle className="capitalize hover:opacity-75">
              {title}
            </CardTitle>
          </Link>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex w-full flex-wrap gap-2">
          {content1}
        </CardContent>
        <div>
          <CardContent>
            <h4 className="flex flex-col gap-2 text-base font-semibold">
              {titleContent2}
              <span className="font-normal">{content2}</span>
            </h4>
          </CardContent>

          <CardContent className="flex gap-4">{content3}</CardContent>
        </div>

        <CardContent className="flex flex-col items-start gap-2">
          <div className="flex flex-col items-center gap-2">
            <h4 className="text-base font-semibold">{titleContent4}</h4>
            {content4}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm capitalize text-neutral-500 dark:text-neutral-400">
            {footer}
          </p>
        </CardFooter>
      </Card>
    </>
  );
}

export default CustomCard;
