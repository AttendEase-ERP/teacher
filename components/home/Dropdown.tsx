"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import Button from "../form/Button";

import classNames from "classnames";

interface SubjectDropdownProps {
  subjects: string[];
  onSelect: (subject: string) => void;
}

const TeacherSubjectDropdown = ({
  subjects,
  onSelect,
}: SubjectDropdownProps) => {
  const [selectedSubject, setSelectedSubject] = useState("Subject");
  const [isHovered, setIsHovered] = useState(false);

  const handleSelect = (subject: string) => {
    setSelectedSubject(subject);
    onSelect(subject);
    setIsHovered(false);
  };

  return (
    <div
      className="relative inline-block text-left w-[120px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        className="flex items-center justify-between bg-primary px-4 hover:bg-[#5b52e0] w-[120%] h-10 text-sm rounded-[10px] duration-200 text-white text-center"
        overrideStyles={true}
      >
        {selectedSubject}
        <ChevronDown size={16} className="text-white" />
      </Button>

      {isHovered && (
        <div className="absolute z-10 mt-1 w-[120%] bg-white rounded-md shadow-md overflow-hidden ring-1 ring-black ring-opacity-5">
          <ul className="text-sm">
            {subjects.map((subject, index) => (
              <li
                key={index}
                onClick={() => handleSelect(subject)}
                className={classNames(
                  "px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700",
                )}
              >
                {subject}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeacherSubjectDropdown;
