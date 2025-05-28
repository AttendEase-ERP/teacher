export type studentsType =
  | {
      id: number;
      name: string;
      email: string;
      enrollment_number: number;
      current_semester: number;
      section_id: number;
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
    }[]
  | undefined;
