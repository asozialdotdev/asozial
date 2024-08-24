import { SquareCheck } from "lucide-react";

function SuccessMessage({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 font-light text-zinc-500 dark:text-zinc-400">
      <span>
        <SquareCheck />
      </span>
      {children}
    </span>
  );
}

export default SuccessMessage;
