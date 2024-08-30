import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CodingLanguage, User } from "@/types/User";
import { Layers } from "lucide-react";
function UserTechStack({ user }: { user: User }) {
  return (
    <div className="h-[420px] overflow-y-scroll">
      <h3 className="flex flex-wrap gap-4 font-semibold">
        <Layers size={24} />
        Tech Stack
      </h3>
      <Table className="text-center">
        <TableHeader>
          <TableRow className="text-center">
            <TableHead className="text-center">Language</TableHead>
            <TableHead className="text-center">Lines of code</TableHead>
            <TableHead className="text-center">Projects</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user.skills.codingLanguages.map(
            ({
              language,
              lines,
              projects,
              textColor,
              bgColor,
            }: CodingLanguage) => (
              <TableRow key={language}>
                <TableCell>
                  <p className={`${bgColor} mx-auto rounded-xl py-2`}>
                    {language}
                  </p>
                </TableCell>
                <TableCell>{new Intl.NumberFormat().format(lines)}</TableCell>
                <TableCell>{projects}</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserTechStack;
