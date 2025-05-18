export type teacherType =
  | {
      id: number;
      section_id: number;
      subject_id: number;
      teacher_id: number;
      Teachers: {
        email: string;
        id: number;
        name: string;
      };
      Sections: {
        course_id: number;
        id: number;
        section_name: string;
        Courses: {
          course_duration: number;
          course_name: string;
          id: number;
        };
      };
      Subjects: {
        id: number;
        semester: number;
        subject_name: string;
      };
    }[]
  | undefined;
