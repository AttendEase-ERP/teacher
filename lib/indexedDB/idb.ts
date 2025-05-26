import Dexie, { EntityTable } from "dexie";

export interface Teachers {
  id: number;
  name: string;
  email: string;
  section_id: number;
  subject_id: number;
  teacher_id: number;
  subject_name: string;
  semester: number;
  section_name: string;
  course_id: number;
  course_name: string;
  course_duration: number;
}

export interface SelectedDateForAttendance {
  id: number;
  date: string;
}

export interface StudentDetails {
  id: number;
  enrollment_number: number;
  name: string;
  email: string;
  current_semester: number;
  section_name: string;
  course_name: string;
  course_duration: number;
}

const idb = new Dexie("AttendEase") as Dexie & {
  Teachers: EntityTable<Teachers, "id">;
  SelectedDateForAttendance: EntityTable<SelectedDateForAttendance, "id">;
  StudentDetails: EntityTable<StudentDetails, "id">;
};

idb.version(1).stores({
  Teachers:
    "id, name, email, section_id, subject_id, teacher_id, subject_name, semester, section_name, course_id, course_name, course_duration",
  SelectedDateForAttendance: "id, date",
  StudentDetails:
    "id, enrollment_number, name, email, current_semester, section_name, course_name, course_duration",
});

export { idb };
