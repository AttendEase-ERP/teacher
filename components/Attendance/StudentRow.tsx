import { Ellipsis } from "lucide-react";
import { Calendar } from "lucide-react";
import { Mail } from "lucide-react";

import { format } from "date-fns";

import Button from "../form/Button";

interface StudentRowProps {
  enrollment: number;
  name: string;
  email: string;
  date: Date;
  status: "Present" | "Absent";
}

export default function StudentRow({
  enrollment,
  name,
  email,
  date,
  status,
}: StudentRowProps) {
  return (
    <div className="grid grid-cols-6 gap-4 items-center p-3 px-5 text-sm bg-[#ffffff] rounded-xl">
      <div>{enrollment}</div>
      <div>{name}</div>
      <div className="flex gap-2">
        <Mail className="text-primary" />
        <p>{email}</p>
      </div>
      <div className="flex gap-2">
        <Calendar className="text-primary" />{" "}
        <p>{format(date, "dd MMM yyyy")}</p>
      </div>
      <Button
        className={`font-medium p-3 rounded-4xl cursor-pointer ${
          status === "Present" ? "bg-[#2FE5A7]" : "bg-[#FF69B4]"
        }`}
        overrideStyles={true}
      >
        {status}
      </Button>
      <div className="flex justify-center">
        <Ellipsis className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-primary transition" />
      </div>
    </div>
  );
}
