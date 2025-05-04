"use client";

import * as React from "react";

import Dropdown from "@/components/home/Dropdown";
import SideBar from "@/components/home/SideBar";
import ClassCardList from "@/components/home/ClassCard";

import { useTeacherContext } from "@/contexts/teacherContext";

export default function Home() {
  const teacherDetails = useTeacherContext();

  const [selectedSubject, setSelectedSubject] = React.useState<string | null>(
    null,
  );
  const [selectedClassDetails, setSelectedClassDetails] = React.useState<
    | {
        semester: number;
        section: string;
      }[]
    | null
  >(null);

  const teacherSubjects =
    teacherDetails?.Teacher_Section_Assignment.map(
      (assignment) => assignment.Subjects.subject_name,
    ) || [];

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
  };

  React.useEffect(() => {
    if (selectedSubject && teacherDetails) {
      const filteredClasses = teacherDetails.Teacher_Section_Assignment.filter(
        (assignment) => assignment.Subjects.subject_name === selectedSubject,
      ).map((assignment) => ({
        semester: assignment.Subjects.semester,
        section: assignment.Sections.section_name,
      }));
      setSelectedClassDetails(filteredClasses);
    } else {
      setSelectedClassDetails([]);
    }
  }, [selectedSubject, teacherDetails]);

  return (
    <main className="h-screen bg-backgroundLight flex flex-row gap-10">
      <SideBar />

      <div className="flex flex-col w-full h-screen bg-backgroundLight gap-10">
        <h1 className="font-bold text-[25px] mt-4">Dashboard</h1>

        <Dropdown subjects={teacherSubjects} onSelect={handleSubjectSelect} />

        <ClassCardList classes={selectedClassDetails} />
      </div>
    </main>
  );
}
