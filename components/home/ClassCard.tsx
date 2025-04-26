import * as React from "react";

import classNames from "classnames";

import Button from "../form/Button";

interface ClassCardProps {
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
}

export function ClassCard({
  title,
  description,
  onClick,
  className,
}: ClassCardProps) {
  return (
    <Button
      onClick={onClick}
      className={classNames(
        "flex items-center justify-start w-[18%] h-[10%] gap-4 p-6 text-left rounded-md border-muted bg-white",
        className,
      )}
      overrideStyles={true}
    >
      <div className="flex flex-col gap-1">
        <div className="font-bold text-[18px]">{title}</div>
        {description && (
          <div className="text-sm text-muted-foreground text-gray-500">
            {description}
          </div>
        )}
      </div>
    </Button>
  );
}
