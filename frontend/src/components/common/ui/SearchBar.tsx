import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  buttonText?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  handleClearSearch?: () => void;
  searchTerm?: string;
};

function SearchBar({
  placeholder = "Type your search here...",
  value,
  onChange,
  onSubmit,
  buttonText = "Search",
  defaultValue,
  handleClearSearch,
  searchTerm,
}: SearchBarProps) {
  return (
    <div className="flex items-center">
      <Input
        placeholder={placeholder}
        className="2xl:[45rem] h-12 rounded-r-none border-r-0 focus:h-10 xs:w-[15rem] sm:w-[25rem] lg:w-[35rem]"
        name="search"
        type="text"
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      />
      {searchTerm ? (
        <Button
          type="button"
          onClick={handleClearSearch}
          className="w-30 h-12 rounded-l-none border-l-0 bg-red-700 text-lg text-light hover:bg-red-800 dark:bg-red-700 dark:text-light dark:hover:bg-red-800"
        >
          Clear Search
        </Button>
      ) : (
        <Button className="h-12 w-24 rounded-l-none border-l-0 text-lg">
          {buttonText}
        </Button>
      )}
    </div>
  );
}

export default SearchBar;
