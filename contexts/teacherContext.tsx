"use client";

import * as React from "react";

import { teacherType } from "@/types/teacher/teacher";

import { useSessionContext } from "./sessionContext";

import { createClient } from "@/utils/supabase/client";

import { getTeacherEmail } from "@/lib/auth/auth";

// create teacher context
const TeacherContext = React.createContext<teacherType>(undefined);

// create teacher provider
export const TeacherProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [teacherDetails, setTeacherDetails] =
    React.useState<teacherType>(undefined);

  const session = useSessionContext();

  React.useEffect(() => {
    const fetchTeacherDetails = async () => {
      const supabase = createClient();
      const email = await getTeacherEmail();

      try {
        const { data, error } = await supabase
          .from("Teachers")
          .select(
            `
            *,
            Teacher_Section_Assignment (
            *,
            Subjects (*),
            Sections (
              *,
              Courses (*)
          )
        )`,
          )
          .eq("email", email!)
          .single();

        if (error) {
          console.log("error occurred while fetching teacher details: ", error);

          setTeacherDetails(undefined);
        } else {
          console.log(
            "teacher data: " +
              data.Teacher_Section_Assignment?.[0].Sections.section_name,
          );

          setTeacherDetails(data as teacherType);
          console.log(teacherDetails);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (session?.user) {
      fetchTeacherDetails();
    } else {
      setTeacherDetails(undefined);
    }
  }, [session?.user?.email]);

  return (
    <TeacherContext.Provider value={teacherDetails}>
      {children}
    </TeacherContext.Provider>
  );
};

// custom hook to use teacher context
export const useTeacherContext = () => {
  const context = React.useContext(TeacherContext);

  return context;
};
