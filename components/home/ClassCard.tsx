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
  onClick?: () => void;
}

function ClassCard({ title, description, onClick, className }: ClassCardProps) {
  return (
    <Button
      onClick={onClick}
      className={classNames(
        "flex items-center justify-start w-[18%] h-[15%] gap-8 pt-8 pr-8 pb-8 pl-3 text-left rounded-md border-muted bg-white",
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
  ...restProps
}: ClassCardListProps) {
  if (classes == null) {
    return (
      <div className="text-center text-gray-500 text-sm mt-4">
        No classes found.
      </div>
    );
  }
  if (classes.length > 0) {
    return (
      <div className="flex flex-wrap gap-4">
        {classes.map((classItem, index) => (
          <ClassCard
            key={index}
            title={
              semesters[classItem.semester] ?? `Semester ${classItem.semester}`
            }
            description={classItem.section}
            {...restProps}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="text-center text-gray-500 text-sm mt-4">
        No classes found.
      </div>
    );
  }
}
