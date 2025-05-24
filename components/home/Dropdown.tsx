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
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (subject: string) => {
    setSelectedSubject(subject);
    onSelect(subject);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block text-left w-[120px]">
      <Button
        className="flex items-center justify-between bg-primary px-4 hover:bg-[#5b52e0] w-[120%] h-10 text-sm rounded-[10px] duration-200 text-white text-center cursor-pointer"
        overrideStyles={true}
        onClick={toggleDropdown}
      >
        {selectedSubject}
        <ChevronDown
          size={16}
          className={classNames(
            "text-white transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        />
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-[120%] bg-white rounded-md shadow-md overflow-hidden ring-1 ring-black ring-opacity-5">
          <ul className="text-sm">
            {subjects.map((subject, index) => (
              <li
                key={index}
                onClick={() => handleSelect(subject)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700"
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
