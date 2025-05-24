import * as React from "react";

import classNames from "classnames";

import Button from "../form/Button";

import { semesters } from "@/constants";

interface ClassCardProps {
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
}

interface ClassCardListProps {
  classes: { semester: number; section: string }[] | null;
  onClick?: (cls: { semester: number; section: string }) => void;
}

function ClassCard({ title, description, onClick, className }: ClassCardProps) {
  return (
    <Button
      onClick={onClick}
      className={classNames(
        "flex items-center justify-start w-[18%] h-[15%] gap-8 pt-8 pr-8 pb-8 pl-3 text-left rounded-md border-muted bg-white cursor-pointer",
        className,
      )}
      overrideStyles={true}
    >
      <div className="flex flex-col gap-2">
        <div className="font-bold text-[15px]">{title}</div>
        {description && (
          <div className="text-sm text-muted-foreground text-gray-500">
            {description}
          </div>
        )}
      </div>
    </Button>
  );
}

export default function ClassCardList({
  classes,
  onClick,
}: ClassCardListProps) {
  if (classes == null || classes.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm mt-4">
        No classes found.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {classes.map((classItem, index) => (
        <ClassCard
          key={`${classItem.semester}-${classItem.section}-${index}`}
          title={
            semesters[classItem.semester] ?? `Semester ${classItem.semester}`
          }
          description={classItem.section}
          onClick={() => onClick?.(classItem)}
        />
      ))}
    </div>
  );
}
