import { Button } from "@/components/ui/button";
import CustomInput from "./CustomInput";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  buttonText?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

function SearchBar({
  placeholder = "Type your search here...",
  value,
  onChange,
  onSubmit,
  buttonText = "Search",
  defaultValue,
}: SearchBarProps) {
  return (
    <div className='flex items-center'>
      <CustomInput
        placeholder={placeholder}
        className="2xl:[45rem] h-12 rounded-r-none border-r-0 focus:h-10 xs:w-[15rem] sm:w-[25rem] lg:w-[35rem]"
        name="search"
        type="text"
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      />
      <Button className="h-12 w-24 rounded-l-none border-l-0 text-lg">
        {buttonText}
      </Button>
    </div>
  );
}

export default SearchBar;
