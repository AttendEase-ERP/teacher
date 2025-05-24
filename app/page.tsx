"use client";

import * as React from "react";

import SideBar from "@/components/home/SideBar";
import Dropdown from "@/components/home/Dropdown";
import ClassCardList from "@/components/home/ClassCard";

import { idb, Teachers } from "@/lib/indexedDB/idb";

import { getTeacherEmail } from "@/lib/auth/auth";

import { createClient } from "@/utils/supabase/client";

import { formatTeacherData } from "@/utils/utils";

import { redirect } from "next/navigation";

export default function Home() {
  const [selectedSubject, setSelectedSubject] = React.useState<string | null>();
  const [subjectsList, setSubjectsList] = React.useState<string[]>([]);
  const [formattedTeacherData, setFormattedTeacherData] = React.useState<
    Teachers[]
  >([]);
  const [selectedClasses, setSelectedClasses] = React.useState<
    { semester: number; section: string }[] | null
  >(null);

  const syncToIDB = async (newData: Teachers[]) => {
    const currentData = await idb.Teachers.toArray();

    const newIDs = new Set(newData.map((item) => item.id));

    const deletedIDs = currentData
      .filter((item) => !newIDs.has(item.id))
      .map((item) => item.id);

    if (deletedIDs.length > 0) {
      await idb.Teachers.bulkDelete(deletedIDs);
    }

    await idb.Teachers.bulkPut(newData);
  };

  const getSemesterAndSection = (
    teacherDataFromIDB: Teachers[],
  ): { semester: number; section: string }[] | null => {
    const semesterAndSection = teacherDataFromIDB.map((item) => ({
      semester: item.semester,
      section: item.section_name,
    }));

    const uniqueSemesterAndSection = Array.from(
      new Set(
        semesterAndSection.map((item) => `${item.semester}/${item.section}`),
      ),
    ).map((item) => {
      const [semester, section] = item.split("/");
      return { semester: Number(semester), section };
    });

    return uniqueSemesterAndSection;
  };

  const getSelectedClassDetails = async (subject: string) => {
    const teacherEmail = await getTeacherEmail();
    const teacherDataFromIDB = await idb.Teachers.where("email")
      .equals(teacherEmail!)
      .toArray();

    const selectedClassDetails = teacherDataFromIDB.filter(
      (item) => item.subject_name === subject,
    );

    setSelectedClasses(getSemesterAndSection(selectedClassDetails));
  };

  const handleSubjectSelect = (selectedSubject: string) => {
    setSelectedSubject(selectedSubject);
    getSelectedClassDetails(selectedSubject);
  };

  React.useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const supabase = createClient();
        const teacherEmail = await getTeacherEmail();
        const teacherDataFromIDB = await idb.Teachers.where("email")
          .equals(teacherEmail!)
          .toArray();

        const fetchTeacherDataFromDB = async () => {
          const { data, error } = await supabase
            .from("Teacher_Section_Assignment")
            .select(
              `
              *,
              Teachers(*),
              Sections(
              *,
              Courses(*)
              ),
              Subjects(*)
              `,
            )
            .eq("Teachers.email", teacherEmail!);
          return { data, error };
        };

        const channel = supabase
          .channel("teacher_data")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
            },
            async () => {
              const { data, error } = await fetchTeacherDataFromDB();
              if (!error) {
                const newFormattedTeacherData: Teachers[] = formatTeacherData(
                  data!,
                );
                setFormattedTeacherData(newFormattedTeacherData);
              }
            },
          )
          .subscribe();

        if (teacherDataFromIDB.length > 0) {
          await syncToIDB(formattedTeacherData);

          const uniqueSubjects = Array.from(
            new Set(teacherDataFromIDB.map((item) => item.subject_name)),
          );

          setSubjectsList(uniqueSubjects);
        } else {
          const { data, error } = await fetchTeacherDataFromDB();

          if (!error && data) {
            const formattedTeacherDataForIDBStore = formatTeacherData(data);
            await idb.Teachers.bulkPut(formattedTeacherDataForIDBStore);
            const uniqueSubjects = Array.from(
              new Set(
                formattedTeacherDataForIDBStore.map(
                  (item) => item.subject_name,
                ),
              ),
            );

            setSubjectsList(uniqueSubjects);
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

    fetchTeacherDetails();
  }, [formattedTeacherData]);
  return (
    <main className="h-screen bg-background-light flex flex-row gap-10">
      <SideBar />

      <div className="flex flex-col w-full h-screen bg-background-light gap-10">
        <h1 className="font-bold text-[25px] mt-4">Dashboard</h1>
        <Dropdown subjects={subjectsList} onSelect={handleSubjectSelect} />

        {selectedSubject && selectedClasses && selectedClasses.length > 0 ? (
          <ClassCardList
            classes={selectedClasses}
            onClick={(cls) => {
              redirect(`/class/${cls.semester}/${cls.section.toLowerCase()}`);
            }}
          />
        ) : selectedSubject ? (
          <div className="text-center text-gray-500 text-sm mt-4">
            No classes assigned for this subject.
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm mt-4">
            Please select a subject to view assigned classes.
          </div>
        )}
      </div>
    </main>
  );
}
