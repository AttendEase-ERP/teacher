"use client";

import React from "react";

import { createClient } from "@/utils/supabase/client";

import { fetchAllStudentsFromIDB, formatStudentData } from "@/utils/utils";

import { idb, StudentDetails } from "@/lib/indexedDB/idb";

import { useLiveQuery } from "dexie-react-hooks";

import StudentListHeader from "./StudentsListHeader";
import StudentRow from "./StudentRow";

interface DisplayStudentsListProps {
  semester: number;
  section: string;
}

export default function DisplayStudentsList({
  semester,
  section,
}: DisplayStudentsListProps) {
  const [studentsDataFromDB, setStudentsDataFromDB] = React.useState<
    StudentDetails[] | undefined
  >(undefined);
  const [studentsDataFromIDB, setStudentsDataFromIDB] = React.useState<
    StudentDetails[] | undefined
  >(undefined);

  const date = useLiveQuery(() => idb.SelectedDateForAttendance.get(1));

  const syncToIDB = async (newData: StudentDetails[]) => {
    const currentData = await idb.StudentDetails.toArray();

    const newIDs = new Set(newData.map((item) => item.id));

    const deletedIDs = currentData
      .filter((item) => !newIDs.has(item.id))
      .map((item) => item.id);

    if (deletedIDs.length > 0) {
      await idb.StudentDetails.bulkDelete(deletedIDs);
    }

    await idb.StudentDetails.bulkPut(newData);

    setStudentsDataFromIDB(newData);
  };

  React.useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const supabase = createClient();
        const fetchStudentsFromIDB = await fetchAllStudentsFromIDB(
          semester,
          section,
        );

        const fetchStudentsDataFromDB = async () => {
          const { data, error } = await supabase
            .from("Students")
            .select(
              `
              *,
              Sections(
              *,
              Courses(*)
              )
            `,
            )
            .eq("current_semester", semester)
            .eq("Sections.section_name", section.toUpperCase());

          return { data, error };
        };

        const channel = supabase
          .channel("fetch_students")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "Students",
              // filter: `current_semester=eq.${semester},Sections.section_name=eq.${section}`,
            },
            async (payload) => {
              const { data, error } = await fetchStudentsDataFromDB();
              if (!error) {
                const formattedStudentsData: StudentDetails[] =
                  formatStudentData(data!);
                setStudentsDataFromDB(
                  formattedStudentsData as StudentDetails[],
                );
              }
              console.log("Change received!", payload);
            },
          )
          .subscribe();

        if (
          fetchStudentsFromIDB.length > 0 &&
          studentsDataFromDB != undefined
        ) {
          // sync to IDB
          await syncToIDB(studentsDataFromDB!);
        } else {
          const { data, error } = await fetchStudentsDataFromDB();
          if (!error) {
            const formattedStudentsData: StudentDetails[] = formatStudentData(
              data!,
            );
            await idb.StudentDetails.bulkPut(formattedStudentsData);

            setStudentsDataFromIDB(formattedStudentsData);
          } else {
            console.error(error);
          }
        }
        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentDetails();
  }, [section, semester, studentsDataFromDB]);

  const students = studentsDataFromIDB
    ? studentsDataFromIDB.map((student) => ({
        enrollment: student.enrollment_number,
        name: student.name,
        email: student.email,
        date: date ? new Date(date.date) : new Date(),
        status: "Absent" as "Present" | "Absent",
      }))
    : [];

  return (
    <div className="w-[98%]">
      <div>
        {" "}
        {/* Titles */}
        <StudentListHeader />
      </div>

      <div className="flex flex-col gap-4">
        {/* Multiple divs for all students */}
        {students.map((student) => (
          <StudentRow key={student.enrollment} {...student} />
        ))}
      </div>
    </div>
  );
}
