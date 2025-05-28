import { idb, StudentDetails, Teachers } from "@/lib/indexedDB/idb";

import { studentsType } from "@/types/students/students";
import { teacherType } from "@/types/teacher/teacher";

const formatTeacherData = (teacherData: teacherType): Teachers[] => {
  if (!teacherData) return [];

  return teacherData.map((item) => ({
    id: item.id,
    name: item.Teachers.name,
    email: item.Teachers.email,
    section_id: item.section_id,
    subject_id: item.subject_id,
    teacher_id: item.teacher_id,
    subject_name: item.Subjects.subject_name,
    semester: item.Subjects.semester,
    section_name: item.Sections.section_name,
    course_id: item.Sections.course_id,
    course_name: item.Sections.Courses.course_name,
    course_duration: item.Sections.Courses.course_duration,
  }));
};

const formatStudentData = (studentData: studentsType): StudentDetails[] => {
  if (!studentData) return [];

  return studentData.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    enrollment_number: item.enrollment_number,
    current_semester: item.current_semester,
    section_id: item.section_id,
    section_name: item.Sections.section_name.toLowerCase(),
    course_id: item.Sections.course_id,
    course_name: item.Sections.Courses.course_name,
    course_duration: item.Sections.Courses.course_duration,
  }));
};

// enter parameters for fetching from IDB (e.g., section_id, semester, subject_id, etc.)
const fetchAllStudentsFromIDB = async (
  semester: number,
  section: string,
): Promise<StudentDetails[]> => {
  const students = await idb.StudentDetails.where("current_semester")
    .equals(semester)
    .and((student) => student.section_name.toLowerCase() == section)
    .toArray();
  if (students.length > 0) {
    return students;
  }

  return [];
};

const fetchDateFromIDB = async (): Promise<Date | undefined> => {
  const existing = await idb.SelectedDateForAttendance.get(1);
  if (existing?.date) {
    return new Date(existing.date);
  }
  return undefined;
};

export {
  formatTeacherData,
  fetchDateFromIDB,
  fetchAllStudentsFromIDB,
  formatStudentData,
};
