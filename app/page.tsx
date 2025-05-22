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
  const [subjectsList, setSubjectsList] = React.useState<string[]>([]);

  const handleSubjectSelect = (selectedSubject: string) => {
    console.log(selectedSubject);
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
            async (payload) => {
              console.log(payload);
              const { data, error } = await fetchTeacherDataFromDB();
              if (!error) {
                const newFormattedTeacherData: Teachers[] = formatTeacherData(
                  data!,
                );
                console.log(newFormattedTeacherData);
              }
            },
          )
          .subscribe();

        if (teacherDataFromIDB.length > 0) {
          // now add realtime here, if any result changes, then it'll be automatically updated in IDB.
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
  }, []);
  return (
    <main className="h-screen bg-backgroundLight flex flex-row gap-10">
      <SideBar />

      <div className="flex flex-col w-full h-screen bg-backgroundLight gap-10">
        <h1 className="font-bold text-[25px] mt-4">Dashboard</h1>
        <Dropdown subjects={subjectsList} onSelect={handleSubjectSelect} />

        {/* <ClassCardList
          classes={selectedClassDetails}
          onClick={() =>
            redirect(
              `/class/${selectedClassDetails![0].semester}/${selectedClassDetails![0].section.toLowerCase()}`,
            )
          }
        /> */}
      </div>
    </main>
  );
}
