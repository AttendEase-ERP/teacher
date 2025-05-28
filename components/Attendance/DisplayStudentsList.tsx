"use client";

import React from "react";

import { createClient } from "@/utils/supabase/client";

import { fetchAllStudentsFromIDB, formatStudentData } from "@/utils/utils";

import { idb, StudentDetails } from "@/lib/indexedDB/idb";

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

  return (
    <div>
      <p>Students list</p>
      <p>semester: {semester}</p>
      <p>section: {section}</p>
    </div>
  );
}
