export type teacherType =
  | {
      id: number;
      name: string;
      email: string;
      Teacher_Section_Assignment: {
        id: number;
        section_id: number;
        subject_id: number;
        teacher_id: number;
        Subjects: {
          id: number;
          subject_name: string;
          semester: number;
        };
        Sections: {
          id: number;
          section_name: string;
          course_id: number;
          Courses: {
            id: number;
            course_name: string;
            course_duration: number;
          };
        };
      }[];
    }
  | undefined;
