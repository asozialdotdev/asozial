import { Input } from "@/components/ui/input";
import { socialsData } from "@/constants";
import { Inputs } from "@/types/Project";
import Image from "next/image";
import { Control, Controller } from "react-hook-form";

type SocialsProps = {
  control: Control<Inputs> | undefined;
};
function Socials({ control }: SocialsProps) {
  return (
    <div className="flex flex-col gap-2">
      {socialsData.map((social) => (
        <div key={social.key} className="mt-6 flex flex-col gap-2">
          <Image
            src={social.imageSrc}
            alt={social.alt}
            width={30}
            height={30}
            className="inline"
          />
          <Controller
            name={`socials.${social.key}` as any}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                id={`socials.${social.key}`}
                placeholder={social.placeholder}
              />
            )}
          />
        </div>
      ))}
    </div>
  );
}

export default Socials;
