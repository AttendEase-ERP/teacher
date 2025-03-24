import { Tables } from "../database/database";

/* 
type teacherType =
  | {
      Teachers: { id: number; name: string; ... }; // Fields from Teachers table
      Teacher_Section_Assignment: { teacher_id: number; section_id: number; ... }; // Fields from Teacher_Section_Assignment table
      Subjects: { subject_id: number; subject_name: string; ... }; // Fields from Subjects table
      Sections: { section_id: number; section_name: string; ... }; // Fields from Sections table
      Courses: { course_id: number; course_name: string; ... }; // Fields from Courses table
    }
  | undefined; // If the context is not initialized yet
*/
export type teacherType =
  | ({ Teachers: Tables<"Teachers"> } & {
      Teacher_Section_Assignment: Tables<"Teacher_Section_Assignment">;
    } & { Subjects: Tables<"Subjects"> } & {
      Sections: Tables<"Sections">;
    } & {
      Courses: Tables<"Courses">;
    })
  | undefined;
